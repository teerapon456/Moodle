import React from 'react';
import { AdminCard, AdminBadge, AdminButton, AdminInput, AdminModal } from '../admin';

// Re-export Admin components as Creator components since they share the exact same design system
// This ensures consistency and reduces code duplication
export const CreatorCard = AdminCard;
export const CreatorBadge = AdminBadge;
export const CreatorButton = AdminButton;
export const CreatorInput = AdminInput;
export const CreatorModal = AdminModal;
