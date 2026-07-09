import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import os from 'os';
import path from 'path';
import crypto from 'crypto';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createServer as createViteServer } from 'vite';
import { v2 as cloudinary } from 'cloudinary';
import { Storage } from './server/storage';
import { sendEmail } from './server/email';
import { User } from './src/types';

async function bootstrap() {
  const app = express();
  const PORT = 3000;

  // Body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Apply Helmet for a robust suite of security headers
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://apis.google.com"],
        "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        "font-src": ["'self'", "https://fonts.gstatic.com"],
        "img-src": ["'self'", "data:", "https://res.cloudinary.com", "https://images.unsplash.com", "https://cdn.simpleicons.org", "https://upload.wikimedia.org", "https://1000logos.net", "https://api.dicebear.com", "https://www.transparenttextures.com", "https://*.pexels.com"],
        "media-src": ["'self'", "https://res.cloudinary.com", "https://videos.pexels.com"],
        "frame-src": ["'self'", "https://www.google.com", "https://maps.google.com", "https://js.stripe.com"],
        "connect-src": ["'self'", "ws:", "wss:"],
      },
    },
  }));

  // Apply rate limiting to all API routes to prevent abuse
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next, options) =>
      res.status(options.statusCode).json({
        error: options.message
      }),
  });
  app.use('/api/', apiLimiter);

  // Configure Cloudinary SDK
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const toUserResponse = (user: any): User => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    dashboardAccess: user.dashboardAccess,
    createdAt: user.createdAt
  });

  const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized. Please sign in.' });
    }
    const token = authHeader.split(' ')[1];
    const sessions = await Storage.getSessions();
    const userId = sessions[token];
    if (!userId) {
      return res.status(401).json({ error: 'Session expired. Please sign in again.' });
    }
    const user = await Storage.getUserById(userId);
    if (!user) {
      return res.status(401).json({ error: 'User profile not found.' });
    }
    (req as any).user = user;
    next();
  };

  const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
    await requireAuth(req, res, () => {
      const user = (req as any).user;
      if (user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden. Admin access required.' });
      }
      next();
    });
  };

  // Auth APIs
  app.post('/api/auth/signup', async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'All registration fields are required' });
      }

      const existing = await Storage.getUserByEmail(email);
      if (existing) {
        return res.status(400).json({ error: 'An account with this email already exists' });
      }

      const salt = crypto.randomBytes(16).toString('hex');
      const passwordHash = Storage.hashPassword(password, salt);

      const userRecord = await Storage.addUser({
        name,
        email,
        passwordHash,
        salt,
        role: 'user',
        dashboardAccess: true // Grant access by default
      });

      const sessionToken = crypto.randomBytes(32).toString('hex');
      await Storage.addSession(sessionToken, userRecord.id);

      res.status(201).json({
        success: true,
        token: sessionToken,
        user: toUserResponse(userRecord)
      });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ error: 'Registration failed. Try again.' });
    }
  });

  app.post('/api/auth/login', async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const userRecord = await Storage.getUserByEmail(email);
      if (!userRecord) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }

      const computedHash = Storage.hashPassword(password, userRecord.salt);
      if (computedHash !== userRecord.passwordHash) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }

      const sessionToken = crypto.randomBytes(32).toString('hex');
      await Storage.addSession(sessionToken, userRecord.id);

      res.json({
        success: true,
        token: sessionToken,
        user: toUserResponse(userRecord)
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Login failed. Try again.' });
    }
  });

  app.post('/api/auth/logout', async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      await Storage.deleteSession(token);
    }
    res.json({ success: true, message: 'Logged out successfully' });
  });

  app.post('/api/auth/forgot-password', async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ error: 'Email is required.' });
      }

      const userRecord = await Storage.getUserByEmail(email);
      if (!userRecord) {
        // For security, always send a generic success message even if email not found
        return res.json({ success: true, message: 'If an account with that email exists, a password reset link has been sent.' });
      }

      const resetToken = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 3600000).toISOString(); // Token valid for 1 hour
      await Storage.addPasswordResetToken(resetToken, userRecord.id, expiresAt);

      // Construct the reset link using the frontend URL from environment variables
      const clientUrl = process.env.CLIENT_URL || `${req.protocol}://${req.get('host')}`;
      const resetLink = `${clientUrl}/reset-password?token=${resetToken}`;

      await sendEmail({
        to: userRecord.email,
        subject: 'Your Password Reset Link for TheMobifixx',
        html: `<p>Hello ${userRecord.name},</p><p>You requested a password reset. Please click the link below to set a new password:</p><p><a href="${resetLink}" target="_blank">${resetLink}</a></p><p>This link will expire in 1 hour. If you did not request this, please ignore this email.</p><p>Thanks,<br/>TheMobifixx Team</p>`
      });

      res.json({ success: true, message: 'If an account with that email exists, a password reset link has been sent.' });
    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({ error: 'Failed to process request. Please try again.' });
    }
  });

  app.post('/api/auth/reset-password', async (req: Request, res: Response) => {
    try {
      const { token, password } = req.body;
      if (!token || !password) {
        return res.status(400).json({ error: 'Token and new password are required.' });
      }

      const resetTokenRecord = await Storage.getPasswordResetToken(token);
      if (!resetTokenRecord) {
        return res.status(400).json({ error: 'Invalid or expired password reset token.' });
      }

      if (new Date(resetTokenRecord.expiresAt) < new Date()) {
        await Storage.deletePasswordResetToken(token); // Clean up expired token
        return res.status(400).json({ error: 'Password reset token has expired. Please request a new one.' });
      }

      const userRecord = await Storage.getUserById(resetTokenRecord.userId);
      if (!userRecord) {
        return res.status(404).json({ error: 'User not found.' });
      }

      const salt = crypto.randomBytes(16).toString('hex');
      const passwordHash = Storage.hashPassword(password, salt);

      await Storage.updateUserPassword(userRecord.id, passwordHash, salt);
      await Storage.deletePasswordResetToken(token); // Invalidate token after use

      res.json({ success: true, message: 'Your password has been reset successfully.' });
    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({ error: 'Failed to reset password. Please try again.' });
    }
  });

  app.get('/api/auth/me', async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    const token = authHeader.split(' ')[1];
    const sessions = await Storage.getSessions();
    const userId = sessions[token];
    if (!userId) {
      return res.status(401).json({ error: 'Session expired' });
    }
    const userRecord = await Storage.getUserById(userId);
    if (!userRecord) {
      return res.status(401).json({ error: 'User not found' });
    }
    res.json(toUserResponse(userRecord));
  });

  // Services
  app.get('/api/services', async (req: Request, res: Response) => {
    try {
      const services = await Storage.getServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve services' });
    }
  });

  // Technicians
  app.get('/api/technicians', async (req: Request, res: Response) => {
    try {
      const technicians = await Storage.getTechnicians();
      res.json(technicians);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve technicians' });
    }
  });

  // Testimonials
  app.get('/api/testimonials', async (req: Request, res: Response) => {
    try {
      const testimonials = await Storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve testimonials' });
    }
  });

  app.post('/api/testimonials', requireAuth, async (req: Request, res: Response) => {
    try {
      const authUser = (req as any).user;
      const { rating, review, deviceType } = req.body;
      if (!rating || !review || !deviceType) {
        return res.status(400).json({ error: 'Rating, review, and device type are required' });
      }
      const numRating = Number(rating);
      if (isNaN(numRating) || numRating < 1 || numRating > 5) {
        return res.status(400).json({ error: 'Rating must be a number between 1 and 5' });
      }

      const defaultImage = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(authUser.name)}&backgroundColor=0f4cff,00c48c,ff7a00,3b82f6`;

      const record = await Storage.addTestimonial({
        customerName: authUser.name,
        rating: numRating,
        review,
        deviceType,
        image: defaultImage,
        userId: authUser.id
      });
      res.status(201).json({ success: true, data: record });
    } catch (error) {
      console.error('Error adding testimonial:', error);
      res.status(500).json({ error: 'Failed to submit testimonial' });
    }
  });

  // API to fetch media from a Cloudinary folder
  app.get('/api/media/:folder', async (req: Request, res: Response) => {
    try {
      const folder = req.params.folder;
      if (!folder) {
        return res.status(400).json({ error: 'Folder name is required.' });
      }

      const results = await cloudinary.search
        .expression(`folder:${folder}`)
        .sort_by('public_id', 'asc')
        .max_results(30)
        .execute();

      res.json(results.resources);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch media from Cloudinary.' });
    }
  });

  // Inquiries
  app.post('/api/inquiries', async (req: Request, res: Response) => {
    try {
      const { name, phone, email, message } = req.body;
      if (!name || !phone || !message) {
        return res.status(400).json({ error: 'Name, phone, and message are required' });
      }
      const record = await Storage.addInquiry({ name, phone, email: email || '', message });
      res.status(201).json({ success: true, data: record });
    } catch (error) {
      res.status(500).json({ error: 'Failed to submit inquiry' });
    }
  });

  // Repair bookings
  app.post('/api/repair-requests', async (req: Request, res: Response) => {
    try {
      const { customerName, phone, email, deviceType, brand, model, issueDescription, pickupRequired, pickupAddress, preferredDate } = req.body;
      if (!customerName || !phone || !deviceType || !brand || !model || !issueDescription) {
        return res.status(400).json({ error: 'Required fields are missing' });
      }

      // Check if user is logged in
      let userId: string | undefined;
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        const sessions = await Storage.getSessions();
        userId = sessions[token] || undefined;
      }

      const record = await Storage.addRepairRequest({
        customerName,
        phone,
        email: email || '',
        deviceType,
        brand,
        model,
        issueDescription,
        pickupRequired: Boolean(pickupRequired),
        pickupAddress: pickupAddress || '',
        preferredDate: preferredDate || new Date().toISOString().split('T')[0],
        userId
      });
      res.status(201).json({ success: true, data: record });
    } catch (error) {
      res.status(500).json({ error: 'Failed to submit repair booking' });
    }
  });

  app.get('/api/repair-requests/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const requests = await Storage.getRepairRequests();
      const match = requests.find(r => r.id && r.id.toLowerCase() === id.toLowerCase());
      if (!match) {
        return res.status(404).json({ error: 'Repair Request ID not found. Please double-check your ID.' });
      }
      res.json(match);
    } catch (error) {
      console.error('Error fetching repair request:', error);
      res.status(500).json({ error: 'Failed to fetch repair status' });
    }
  });

  // User Dashboard Repair Orders
  app.get('/api/user/repair-requests', requireAuth, async (req: Request, res: Response) => {
    try {
      const authUser = (req as any).user;
      const allRequests = await Storage.getRepairRequests();
      const userRequests = allRequests.filter(r => r.userId === authUser.id);
      res.json(userRequests);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve repair requests' });
    }
  });

  // Admin Panel Actions
  app.get('/api/admin/users', requireAdmin, async (req: Request, res: Response) => {
    try {
      const usersList = await Storage.getUsers();
      const users = usersList.map(toUserResponse);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve users list' });
    }
  });

  app.put('/api/admin/users/:id/access', requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { dashboardAccess } = req.body;
      if (dashboardAccess === undefined) {
        return res.status(400).json({ error: 'dashboardAccess value is required' });
      }
      const success = await Storage.updateUserAccess(id, Boolean(dashboardAccess));
      if (!success) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ success: true, message: 'User access updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user access' });
    }
  });

  app.delete('/api/admin/users/:id', requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const success = await Storage.deleteUser(id);
      if (!success) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete user' });
    }
  });

  app.delete('/api/admin/testimonials/:id', requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const success = await Storage.deleteTestimonial(id);
      if (!success) {
        return res.status(404).json({ error: 'Testimonial not found' });
      }
      res.json({ success: true, message: 'Testimonial deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete testimonial' });
    }
  });

  app.put('/api/admin/repair-requests/:id/status', requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const validStatuses = ['pending', 'accepted', 'in_repair', 'completed', 'cancelled'];
      if (!status || !validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Status value is required' });
      }
      const success = await Storage.updateRepairRequestStatus(id, status as any);
      if (!success) {
        return res.status(404).json({ error: 'Repair request not found' });
      }
      res.json({ success: true, message: 'Repair request status updated' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update status' });
    }
  });

  app.get('/api/admin/repair-requests', requireAdmin, async (req: Request, res: Response) => {
    try {
      const requests = await Storage.getRepairRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve repair requests' });
    }
  });

  app.delete('/api/admin/repair-requests/:id', requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const success = await Storage.deleteRepairRequest(id);
      if (!success) {
        return res.status(404).json({ error: 'Repair request not found' });
      }
      res.json({ success: true, message: 'Repair request deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete repair request' });
    }
  });

  app.get('/api/admin/inquiries', requireAdmin, async (req: Request, res: Response) => {
    try {
      const inquiries = await Storage.getInquiries();
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve inquiries' });
    }
  });

  app.delete('/api/admin/inquiries/:id', requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const success = await Storage.deleteInquiry(id);
      if (!success) {
        return res.status(404).json({ error: 'Inquiry not found' });
      }
      res.json({ success: true, message: 'Inquiry deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete inquiry' });
    }
  });

  app.post('/api/admin/technicians', requireAdmin, async (req: Request, res: Response) => {
    try {
      const { name, designation, experience, specialization, repairsCompleted, rating, serviceAreas, profileImage, certifications } = req.body;
      if (!name || !designation || !specialization) {
        return res.status(400).json({ error: 'Required fields are missing' });
      }
      const record = await Storage.addTechnician({
        name,
        designation,
        experience: Number(experience) || 0,
        specialization,
        repairsCompleted: Number(repairsCompleted) || 0,
        rating: Number(rating) || 5.0,
        serviceAreas: Array.isArray(serviceAreas) ? serviceAreas : [],
        profileImage: profileImage || 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400',
        certifications: Array.isArray(certifications) ? certifications : []
      });
      res.status(201).json({ success: true, data: record });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add technician' });
    }
  });

  app.put('/api/admin/technicians/:id', requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, designation, experience, specialization, repairsCompleted, rating, serviceAreas, profileImage, certifications } = req.body;
      const success = await Storage.updateTechnician(id, {
        name,
        designation,
        experience: Number(experience) || 0,
        specialization,
        repairsCompleted: Number(repairsCompleted) || 0,
        rating: Number(rating) || 5.0,
        serviceAreas: Array.isArray(serviceAreas) ? serviceAreas : [],
        profileImage: profileImage || 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400',
        certifications: Array.isArray(certifications) ? certifications : []
      });
      if (!success) {
        return res.status(404).json({ error: 'Technician not found' });
      }
      res.json({ success: true, message: 'Technician updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update technician' });
    }
  });

  app.delete('/api/admin/technicians/:id', requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const success = await Storage.deleteTechnician(id);
      if (!success) {
        return res.status(404).json({ error: 'Technician not found' });
      }
      res.json({ success: true, message: 'Technician deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete technician' });
    }
  });

  // Serve static assets and frontend SPA router
  if (process.env.NODE_ENV !== 'production') {
    // Development mode with Vite server
    console.log('Starting server in DEVELOPMENT mode with Vite HMR middleware...');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production mode
    console.log('Starting server in PRODUCTION mode...');
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Global error handler
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Unhandled server error:', err);
    res.status(500).json({ error: 'Internal server error occurred' });
  });

  // Initialize Database
  await Storage.init();

  // Start listening
  const server = app.listen(PORT, '0.0.0.0', () => {
    const getNetworkAddress = () => {
      const interfaces = os.networkInterfaces();
      for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]!) {
          if (iface.family === 'IPv4' && !iface.internal) {
            return iface.address;
          }
        }
      }
      return 'localhost';
    };
    const networkAddress = getNetworkAddress();
    console.log('\nServer is running and accessible on:');
    console.log(`  - Local:   http://localhost:${PORT}`);
    console.log(`  - Network: http://${networkAddress}:${PORT}\n`);
  });



  // Graceful shutdown handlers
  const shutdown = async () => {
    console.log('Shutting down server gracefully...');
    server.close(async () => {
      await Storage.close();
      process.exit(0);
    });
    // Force exit if shutdown takes too long
    setTimeout(() => {
      console.warn('Forcing exit after timeout.');
      process.exit(1);
    }, 2000);
  };
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

bootstrap().catch((err) => {
  console.error('Failed to bootstrap server application:', err);
});
