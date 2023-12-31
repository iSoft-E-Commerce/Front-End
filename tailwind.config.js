/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        md: '768px',
        xl: '1440px',
      },
      height: {
        header: '88px',
        headerMobile: '60px',
        input: '45px',
        productBtn: '50px',
      },
      maxWidth: {
        md: '95%',
        xl: '1440px',
        lg: '1024px',
        medium: '920px',
        navMenu: '120px',
        loginForm: '350px',
        profileForm: '920px',
        closeBtn: '30px',
        contactsForm: '800px',
        searchBar: '430px',
        contactsData: '300px',
        productBtn: '220px',
        userReview: '160px',
      },
      maxHeight: {
        searchedValues: '350px',
        basketPopUpProducts: '400px',
        rateHeight: '300px',
      },
      boxShadow: {
        insetErrorInput: 'inset 0px -1px 0px rgba(0,0,0,0.3)',
        productInfo: '0px 0px 10px rgba(0,0,0,.07)',
      },
      backgroundImage: {},
      backgroundColor: {
        white: 'white',
        whiteLabel: {
          100: '#f1f5f9',
          200: '#e2e8f0',
        },
      },
      fontFamily: {},
      fontSize: {
        dispXL: ['64px', '125%'],
        dispL: ['48px', '125%'],
        dispM: ['36px', '125%'],
        dispS1: ['28px', '140%'],
        dispS2: ['24px', '140%'],
        dispS3: ['20px', '140%'],
        parL: ['18px', '160%'],
        parM: ['16px', '160%'],
        parS: ['14px', '160%'],
        quot: ['12px', '160%'],
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#ffffff',
        softGreen: '#F4FAF9',
        errorText: '#C23D3D',
        stroke: '#D1D5DB',
        underHeader: '#282828',
        discountColor: '#e31837',
        yellowCheckbox: '#fecd65',
        bannerWatch: '#fe0100',
        green: {
          100: '#0E927A',
          90: '#269D87',
          80: '#3EA895',
          60: '#6EBEAF',
          40: '#9FD3CA',
          20: '#CFE9E4',
          10: '#E7F4F2',
        },
        orange: {
          100: '#FF6500',
          90: '#FF741A',
          80: '#FF8433',
          60: '#FFA366',
          40: '#FFC199',
          20: '#FFE0CC',
          10: '#FFF0E6',
        },
        yellow: {
          100: '#FFBE3F',
          90: '#FFC452',
          80: '#FFCB65',
          60: '#FFD88C',
          40: '#FFE5B2',
          20: '#FFF2D9',
          10: '#FFF8EC',
        },
        purple: {
          100: '#6F4FF9',
          90: '#7D61FA',
          80: '#8C72FA',
          60: '#A995FB',
          40: '#C5B9FD',
          20: '#E2DCFE',
          10: '#F1EDFE',
        },
        blue: {
          100: '#05A3E6',
          90: '#1EACE8',
          80: '#37B5EB',
          60: '#69C8F0',
          40: '#9BDAF5',
          20: '#CDEDFA',
          10: '#E6F6FC',
        },
        mystic: {
          100: '#E1E8EB',
          90: '#E4EAED',
          80: '#E7EDEF',
          60: '#EDF1F3',
          40: '#F3F6F7',
          20: '#F9FAFB',
          10: '#FCFDFD',
        },
        darkSkyBlue: {
          100: '#203B54',
          90: '#364F65',
          80: '#4D6276',
          60: '#798998',
          40: '#A6B1BB',
          20: '#D2D8DD',
          10: '#E9EBEE',
        },
        darkGray: {
          100: '#2B2B2B',
          90: '#3C3C3C',
          80: '#4F4F4F',
          60: '#636363',
          40: '#828282',
          20: '#9E9E9E',
          10: '#BDBDBD',
        },
        error: {
          100: '#E05B5B',
          90: '#F46F6F',
          80: '#FF8383',
          20: '#ff00002e',
        },
      },
      animation: {
        pulsate: 'pulsate 2s infinite',
        spiner: 'spiner 20s infinite linear',
      },
      keyframes: {
        pulsate: {
          '0%': { 'box-shadow': '0 0px 0 0 rgba(189, 189, 189, 0)' },
          '50%': { 'box-shadow': '0 2px 0px -1px rgba(166, 177, 187, 0.7)' },
          '100%': { 'box-shadow': '0 0px 0 0 rgba(189, 189, 189, 0)' },
        },
        spiner: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
      },
    },
  },
  plugins: [],
};
