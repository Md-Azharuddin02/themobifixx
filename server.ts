/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { Storage } from './server/storage';

async function bootstrap() {
  const app = express();
  const PORT = 3000;

  // Body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Endpoints
  app.get('/api/services', (req: Request, res: Response) => {
    try {
      const services = Storage.getServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve services' });
    }
  });

  app.get('/api/technicians', (req: Request, res: Response) => {
    try {
      const technicians = Storage.getTechnicians();
      res.json(technicians);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve technicians' });
    }
  });

  app.get('/api/testimonials', (req: Request, res: Response) => {
    try {
      const testimonials = Storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve testimonials' });
    }
  });

  app.post('/api/testimonials', (req: Request, res: Response) => {
    try {
      const { customerName, rating, review, deviceType } = req.body;
      if (!customerName || !rating || !review || !deviceType) {
        return res.status(400).json({ error: 'Name, rating, review, and device type are required' });
      }
      const numRating = Number(rating);
      if (isNaN(numRating) || numRating < 1 || numRating > 5) {
        return res.status(400).json({ error: 'Rating must be a number between 1 and 5' });
      }
      
      const defaultImage = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(customerName)}&backgroundColor=0f4cff,00c48c,ff7a00,3b82f6`;
      
      const record = Storage.addTestimonial({
        customerName,
        rating: numRating,
        review,
        deviceType,
        image: defaultImage
      });
      res.status(201).json({ success: true, data: record });
    } catch (error) {
      console.error('Error adding testimonial:', error);
      res.status(500).json({ error: 'Failed to submit testimonial' });
    }
  });

  app.post('/api/inquiries', (req: Request, res: Response) => {
    try {
      const { name, phone, email, message } = req.body;
      if (!name || !phone || !message) {
        return res.status(400).json({ error: 'Name, phone, and message are required' });
      }
      const record = Storage.addInquiry({ name, phone, email: email || '', message });
      res.status(201).json({ success: true, data: record });
    } catch (error) {
      res.status(500).json({ error: 'Failed to submit inquiry' });
    }
  });

  app.post('/api/repair-requests', (req: Request, res: Response) => {
    try {
      const { customerName, phone, email, deviceType, brand, model, issueDescription, pickupRequired, pickupAddress, preferredDate } = req.body;
      if (!customerName || !phone || !deviceType || !brand || !model || !issueDescription) {
        return res.status(400).json({ error: 'Required fields are missing' });
      }
      const record = Storage.addRepairRequest({
        customerName,
        phone,
        email: email || '',
        deviceType,
        brand,
        model,
        issueDescription,
        pickupRequired: Boolean(pickupRequired),
        pickupAddress: pickupAddress || '',
        preferredDate: preferredDate || new Date().toISOString().split('T')[0]
      });
      res.status(201).json({ success: true, data: record });
    } catch (error) {
      res.status(500).json({ error: 'Failed to submit repair booking' });
    }
  });

  app.get('/api/repair-requests/:id', (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const requests = Storage.getRepairRequests();
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

  // Start listening
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening at http://0.0.0.0:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error('Failed to bootstrap server application:', err);
});
