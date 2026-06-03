/**
 * Lucide icon resolver — maps a string name (from pillar/guide frontmatter) to a
 * lucide-react component. SVG icons only (no raster), per design vocabulary.
 */

import {
  Compass,
  MessagesSquare,
  ClipboardCheck,
  HelpCircle,
  Scale,
  FileText,
  Calendar,
  Phone,
  ShieldCheck,
  BookOpen,
  Clock,
  AlertTriangle,
  Heart,
  Building2,
  Home,
  Briefcase,
  Users,
  Landmark,
  Gavel,
  FileSignature,
  Mail,
  Video,
  MessageCircle,
  Wallet,
  type LucideIcon,
} from 'lucide-react'

const MAP: Record<string, LucideIcon> = {
  Compass,
  MessagesSquare,
  ClipboardCheck,
  HelpCircle,
  Scale,
  FileText,
  Calendar,
  Phone,
  ShieldCheck,
  BookOpen,
  Clock,
  AlertTriangle,
  Heart,
  Building2,
  Home,
  Briefcase,
  Users,
  Landmark,
  Gavel,
  FileSignature,
  Mail,
  Video,
  MessageCircle,
  Wallet,
}

export function Icon({
  name,
  className,
}: {
  name?: string
  className?: string
}) {
  const Cmp = (name && MAP[name]) || FileText
  return <Cmp className={className} />
}
