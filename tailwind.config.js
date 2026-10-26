/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./*.html",
    "./js/**/*.js",
    "./css/**/*.css",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#15803D',
          hover: '#166534',
          light: '#DCFCE7',
          50: '#F0FDF4',
          100: '#DCFCE7',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
        },
        secondary: {
          DEFAULT: '#1E2A5E',
          hover: '#151D42',
          light: '#2D3D82',
          900: '#1E2A5E',
        },
        accent: {
          DEFAULT: '#F97316',
          hover: '#EA580C',
          light: '#FFEDD5',
        },
        canvas: {
          DEFAULT: '#F0FDF4',
          bg: '#F0FDF4',
        },
        card: {
          DEFAULT: '#FFFFFF',
          bg: '#FFFFFF',
        },
        body: '#111827',
        muted: '#6B7280',
        border: {
          DEFAULT: '#E5E7EB',
          subtle: '#E5E7EB',
          medium: '#D1D5DB',
        },
        status: {
          available: {
            DEFAULT: '#16A34A',
            bg: '#DCFCE7',
            text: '#14532D',
          },
          pending: {
            DEFAULT: '#F59E0B',
            bg: '#FEF3C7',
            text: '#78350F',
          },
          rejected: {
            DEFAULT: '#DC2626',
            bg: '#FEE2E2',
            text: '#7F1D1D',
          },
        },
      },
      borderRadius: {
        card: '10px',
        modal: '12px',
        btn: '8px',
      },
      boxShadow: {
        subtle: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        cardHover: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05)',
        modal: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
