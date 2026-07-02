import * as Icons from 'lucide-react';

interface ServiceIconProps {
  name: string;
  className?: string;
}

export default function ServiceIcon({ name, className = "w-6 h-6" }: ServiceIconProps) {
  // Safe dynamic lookup map
  const IconComponent = (Icons as any)[name];
  
  if (IconComponent) {
    return <IconComponent className={className} />;
  }
  
  // Fallback icon
  return <Icons.Settings className={className} />;
}
