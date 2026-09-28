/**
 * Type definitions for Punitdhan Pulses Limited corporate website.
 */

export interface Product {
  id: string;
  name: string;
  hindiName: string;
  type: "pulses" | "grains" | "oil" | "others";
  description: string;
  nutrients: string[];
  imagePlaceholder: string; // Describes the illustration/image representation
  iconName: string;
}

export interface Leader {
  id: string;
  name: string;
  title: string;
  role: string;
  description: string[];
  avatarColor: string; // Premium fallback styling gradient
  photoUrl?: string; // Sourced professional photo URL
}

export interface Strength {
  id: string;
  title: string;
  description: string;
  iconName: string;
  colorClass: string;
}

export interface Partner {
  id: string;
  name: string;
  logoShort: string;
  type: "government" | "corporate";
}

export interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
