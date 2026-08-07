'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home,
  Compass,
  History,
  PlusCircle,
  User,
  ChevronDown,
  LogOut,
  Backpack,
} from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { authClient } from '@/src/lib/auth-client';

const adminMenuItem = [
  { label: 'Home', href: '/dashboard/user/home', icon: Home },
  { label: 'Explore Campaigns', href: '/campaigns', icon: Compass },
  {
    label: 'My Orders',
    href: '/dashboard/user/order',
    icon: Backpack,
  },
  {
    label: 'Payment History',
    href: '/dashboard/user/history',
    icon: History,
  },
];

const storeMenu = [
  { label: 'Home', href: '/dashboard/store/home', icon: Home },
  { label: 'Add Foods', href: '/dashboard/store/add-foods', icon: PlusCircle },
];

const roleColors: Record<string, string> = {
  user: '#FACC15',
  store: '#EF4444',
};

const DashboardSideBar = () => {
  const router = useRouter();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<any>(null);

  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const user = session?.user as any;
  const role = user?.role;

  const menuItems =
    role === 'admin'
      ? adminMenuItem
      : role === 'store'
        ? storeMenu
          : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsUserDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsUserDropdownOpen(false), 150);
  };

  const handleDropdownClick = () => setIsUserDropdownOpen(!isUserDropdownOpen);

  const handleSignOut = async () => {
    const toastId = toast.loading('Signing out...');
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success('Signed out!', { id: toastId });
            router.push('/signin');
          },
        },
      });
    } catch (error) {
      console.error(error);
      toast.error('Sign out failed.', { id: toastId });
    }
  };

  const accentColor = roleColors[role] || '#FACC15';

  return (
    <aside
      className="w-[260px] h-screen sticky top-0 flex flex-col justify-between z-40 select-none"
      style={{
        background: 'rgba(9,9,11,0.95)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(16px)',
      }}
    >
      {/* Brand Header */}
      <div>
        <div
          className="h-16 flex items-center px-6"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="text-white font-extrabold text-2xl tracking-tight">
              Food<span className="text-yellow-400">Zen</span>
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-0.5 overflow-y-auto max-h-[calc(100vh-170px)]">
          <p className="text-[10px] font-black text-white/25 uppercase tracking-widest px-3 mb-3">
            Navigation
          </p>
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={index}
                href={item.href}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 group relative"
                style={{
                  background: active ? `${accentColor}18` : 'transparent',
                  color: active ? accentColor : 'rgba(255,255,255,0.45)',
                  border: active
                    ? `1px solid ${accentColor}30`
                    : '1px solid transparent',
                }}
              >
                {active && (
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full"
                    style={{
                      background: accentColor,
                      boxShadow: `0 0 8px ${accentColor}`,
                    }}
                  />
                )}
                <IconComponent
                  className="h-4 w-4 flex-shrink-0 transition-colors duration-200"
                  style={{
                    color: active ? accentColor : 'rgba(255,255,255,0.3)',
                  }}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Section */}
      <div
        className="p-4 relative"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        {user ? (
          <div className="relative" ref={dropdownRef}>
            {/* Dropdown */}
            {isUserDropdownOpen && (
              <div
                className="absolute bottom-full left-0 mb-2 w-56 rounded-2xl p-1.5 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150"
                style={{
                  background: 'rgba(24, 9, 11, 0.98)',
                  border: '1px solid rgba(153, 27, 27, 0.4)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 16px 48px rgba(0,0,0,0.7)',
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="px-3 py-2.5 border-b border-red-900/30 mb-1">
                  <p className="text-white text-xs font-black truncate">
                    {user.name}
                  </p>
                  <p className="text-white/40 text-[10px] truncate mt-0.5">
                    {user.email}
                  </p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#EF4444] hover:bg-red-500/15 transition-all duration-200 cursor-pointer"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}

            {/* Profile card */}
            <div
              className="flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all duration-200 hover:border-red-800/40"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(153, 27, 27, 0.25)',
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleDropdownClick}
            >
              <div
                className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center border flex-shrink-0"
                style={{
                  borderColor: `${accentColor}40`,
                  background: `${accentColor}20`,
                }}
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="User avatar"
                    className="w-full h-full object-cover"
                  />
                ) : user.image ? (
                  <img
                    src={user.image}
                    alt="User avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="h-4 w-4" style={{ color: accentColor }} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-black truncate leading-tight">
                  {user.name}
                </p>
                <p
                  className="text-[10px] font-black uppercase tracking-wider mt-0.5"
                  style={{ color: accentColor }}
                >
                  {role}
                </p>
              </div>
              <ChevronDown
                className={`h-3.5 w-3.5 text-white/35 transition-transform duration-300 flex-shrink-0 ${isUserDropdownOpen ? 'rotate-180' : ''}`}
              />
            </div>
          </div>
        ) : (
          <div
            className="flex items-center gap-3 p-2.5 rounded-xl animate-pulse"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(153, 27, 27, 0.25)',
            }}
          >
            <div className="w-8 h-8 rounded-full bg-white/8 flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-2.5 bg-white/8 rounded w-3/4" />
              <div className="h-2 bg-white/5 rounded w-1/2" />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default DashboardSideBar;

