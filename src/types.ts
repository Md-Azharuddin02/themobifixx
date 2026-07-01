/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Inquiry {
  id?: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: 'pending' | 'contacted' | 'resolved';
  createdAt: string;
}

export interface RepairRequest {
  id?: string;
  customerName: string;
  phone: string;
  email: string;
  deviceType: 'laptop' | 'macbook' | 'mobile' | 'tablet' | 'other';
  brand: string;
  model: string;
  issueDescription: string;
  pickupRequired: boolean;
  pickupAddress?: string;
  preferredDate: string;
  status: 'pending' | 'accepted' | 'in_repair' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Technician {
  id?: string;
  name: string;
  designation: string;
  experience: number; // in years
  specialization: string;
  repairsCompleted: number;
  rating: number;
  serviceAreas: string[];
  profileImage: string;
  certifications: string[];
  createdAt: string;
}

export interface Testimonial {
  id?: string;
  customerName: string;
  rating: number;
  review: string;
  image: string;
  deviceType: string;
  createdAt: string;
}

export interface ServiceCategory {
  id?: string;
  title: string;
  slug: string;
  description: string;
  icon: string; // Lucide icon name
  featuredImage: string;
  seoTitle: string;
  seoDescription: string;
  highlights?: string[];
  pricing?: string;
}
