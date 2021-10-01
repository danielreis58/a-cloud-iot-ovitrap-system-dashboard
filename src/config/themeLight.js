import { createMuiTheme } from '@material-ui/core/styles'

const palette = {
  type: 'light',
  primary: {
    main: '#26a69a',
    secondary: '#66bb6a'
  },
  secondary: {
    main: '#F46A6A'
  },
  error: {
    main: '#F46A6A'
  },
  success: {
    main: '#4dbf7e'
  },
  background: {
    default: '#f0f0f0',
    paper: '#ffffff',
    paper2: '#f9f9f9'
  },
  text: {
    primary: '#144944',
    secondary: 'rgba(28,48,89,.6)',
    tertiary: 'rgba(28,48,89,.3)'
  },
  status: [
    '#9AC355', // green
    '#F8CD46', // yellow
    '#F48024', // orange
    '#F46A6A', // red
    '#556482' // gray
  ],
  metrics: [
    '#fff', // white
    '#F8CD46', // yellow
    '#F48024', // orange
    '#F46A6A', // red
    '#556482' // gray
  ],
  myChip: [
    '#31757A', // cyan
    '#009EE2', // blue
    '#D9318A', // magenta
    '#9AC355' // green
  ],
  scroll: '#009EE2',
  divider: 'rgba(0,158,226,.1)',
  hover: 'rgba(0,158,226,.03)',
  hover2: 'rgba(0,158,226,.15)',
  hover3: 'rgba(0,158,226,.3)',
  hover4: 'rgba(0,158,226,.6)',
  details: 'rgba(0,158,226,.1)',
  details2: 'rgba(0,158,226,.3)',
  highlightSearch: 'rgba(0,158,226,.3)',
  highlightSearchActive: 'rgba(0,158,226,.9)',
  icon: '#1C3059',
  placeholder: '#9fb2b0'
}

const shape = {
  borderRadius: 5,
  scrollSize: 3,
  scrollRadius: 3
}

const font = {
  size: 14,
  weight: {
    light: 300,
    regular: 400,
    bold: 700,
    black: 900
  },
  lineHeight: '1.5'
}

const typography = {
  useNextVariants: true,
  fontFamily: [
    'Roboto',
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Poppins',
    'Segoe UI',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    'sans-serif'
  ].join(','),
  fontSize: font.size,
  lineHeight: font.lineHeight,
  fontWeightLight: font.weight.light,
  fontWeightRegular: font.weight.regular,
  fontWeightBold: font.weight.bold,
  fontWeightBlack: font.weight.black,
  h1: {
    fontSize: font.size + 14,
    fontWeight: font.weight.bold,
    lineHeight: font.lineHeight,
    color: palette.text.primary
  },
  h2: {
    fontSize: font.size + 12,
    fontWeight: font.weight.bold,
    lineHeight: font.lineHeight,
    color: palette.text.primary
  },
  h3: {
    fontSize: font.size + 10,
    fontWeight: font.weight.bold,
    lineHeight: font.lineHeight,
    color: palette.text.primary
  },
  h4: {
    fontSize: font.size + 8,
    fontWeight: font.weight.bold,
    lineHeight: font.lineHeight,
    color: palette.text.primary
  },
  h5: {
    fontSize: font.size + 6,
    fontWeight: font.weight.bold,
    lineHeight: font.lineHeight,
    color: palette.text.primary
  },
  h6: {
    fontSize: font.size + 4,
    fontWeight: font.weight.bold,
    lineHeight: font.lineHeight,
    color: palette.text.primary
  },
  subtitle1: {
    fontSize: font.size + 4,
    fontWeight: font.weight.regular,
    lineHeight: font.lineHeight,
    color: palette.text.primary
  },
  subtitle2: {
    fontSize: font.size + 2,
    fontWeight: font.weight.regular,
    lineHeight: font.lineHeight,
    color: palette.text.primary
  },
  body1: {
    fontSize: font.size,
    fontWeight: font.weight.regular,
    lineHeight: font.lineHeight,
    color: palette.text.primary
  },
  body2: {
    fontSize: font.size - 2,
    fontWeight: font.weight.regular,
    lineHeight: font.lineHeight,
    color: palette.text.secondary
  },
  button: {
    fontSize: font.size,
    fontWeight: font.weight.bold,
    textTransform: 'none'
  },
  caption: {
    fontSize: font.size,
    fontWeight: font.weight.regular,
    lineHeight: font.lineHeight,
    color: palette.text.primary
  },
  overline: {
    fontSize: font.size,
    fontWeight: font.weight.regular,
    lineHeight: font.lineHeight,
    color: palette.text.primary
  }
}

const shadows = [
  'none',
  '0 1px 1px 0 rgba(0,0,0,.05)',
  '0 1px 1px 0 rgba(0,0,0,.05), 0 2px 2px 0 rgba(0,0,0,.05)',
  '0 1px 1px 0 rgba(0,0,0,.05), 0 3px 4px 0 rgba(0,0,0,.05)',
  '0 2px 3px 0 rgba(0,0,0,.05), 0 4px 5px 0 rgba(0,0,0,.05)',
  '0 3px 5px 0 rgba(0,0,0,.05), 0 6px 10px 0 rgba(0,0,0,.05)',
  '0 4px 5px 0 rgba(0,0,0,.05), 0 8px 10px 1px rgba(0,0,0,.05)',
  '0 4px 6px 0 rgba(0,0,0,.05), 0 9px 12px 1px rgba(0,0,0,.05)',
  '0 6px 9px 0 rgba(0,0,0,.05), 0 12px 17px 2px rgba(0,0,0,.05)',
  '0 8px 12px 0 rgba(0,0,0,.05), 0 16px 24px 2px rgba(0,0,0,.05)',
  '0 12px 19px 0 rgba(0,0,0,.05), 0 24px 38px 3px rgba(0,0,0,.05)',
  '0 12px 19px 0 rgba(0,0,0,.05), 0 24px 38px 3px rgba(0,0,0,.05)',
  '0 12px 19px 0 rgba(0,0,0,.05), 0 24px 38px 3px rgba(0,0,0,.05)',
  '0 12px 19px 0 rgba(0,0,0,.05), 0 24px 38px 3px rgba(0,0,0,.05)',
  '0 12px 19px 0 rgba(0,0,0,.05), 0 24px 38px 3px rgba(0,0,0,.05)',
  '0 12px 19px 0 rgba(0,0,0,.05), 0 24px 38px 3px rgba(0,0,0,.05)',
  '0 12px 19px 0 rgba(0,0,0,.05), 0 24px 38px 3px rgba(0,0,0,.05)',
  '0 12px 19px 0 rgba(0,0,0,.05), 0 24px 38px 3px rgba(0,0,0,.05)',
  '0 12px 19px 0 rgba(0,0,0,.05), 0 24px 38px 3px rgba(0,0,0,.05)',
  '0 12px 19px 0 rgba(0,0,0,.05), 0 24px 38px 3px rgba(0,0,0,.05)',
  '0 12px 19px 0 rgba(0,0,0,.05), 0 24px 38px 3px rgba(0,0,0,.05)',
  '0 12px 19px 0 rgba(0,0,0,.05), 0 24px 38px 3px rgba(0,0,0,.05)',
  '0 12px 19px 0 rgba(0,0,0,.05), 0 24px 38px 3px rgba(0,0,0,.05)',
  '0 12px 19px 0 rgba(0,0,0,.05), 0 24px 38px 3px rgba(0,0,0,.05)',
  '0 12px 19px 0 rgba(0,0,0,.05), 0 24px 38px 3px rgba(0,0,0,.05)',
  '0 12px 19px 0 rgba(0,0,0,.05), 0 24px 38px 3px rgba(0,0,0,.05)'
]

const light = createMuiTheme({
  shape,
  typography,
  palette,
  shadows,
  overrides: {
    MuiDrawer: {
      paper: {
        elevation: 3,
        backgroundColor: palette.primary.main
      }
    },
    MuiSnackbarContent: {
      root: {
        margin: 20,
        backgroundColor: 'rgba(0,0,0,.8)',
        fontSize: typography.fontSize,
        color: '#fff'
      }
    },
    MuiListItemText: {
      primary: {
        fontWeight: typography.fontWeightBold,
        color: palette.text.primary
      },
      secondary: {
        fontWeight: typography.fontWeightRegular,
        color: palette.text.primary
      }
    },
    MuiPaper: {
      root: {
        overflow: 'hidden'
      }
    },
    MuiSvgIcon: {
      root: {}
    },
    MuiCardContent: {
      root: {
        '&:last-child': {
          paddingBottom: 16
        }
      }
    },
    MuiDialog: {
      paper: {
        // backgroundColor: 'transparent',
        boxShadow: shadows[12],
        borderRadius: shape.borderRadius * 2
      }
    },
    MuiDialogTitle: {
      root: {
        padding: 20,
        paddingTop: 10,
        paddingBottom: 10,
        // backgroundColor: '#fff',
        zIndex: 1000,
        '& h2': {
          margin: 0,
          padding: 0
          // color: palette.primary.secondary,
        }
      }
    },
    MuiDialogContent: {
      root: {
        padding: 20,
        zIndex: 999,
        scrollBehavior: 'smooth',
        '&::-webkit-scrollbar': {
          width: shape.scrollSize
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: palette.scroll,
          borderRadius: shape.scrollRadius
        }
      }
    },
    MuiDialogActions: {
      root: {
        borderTop: `1px solid ${palette.divider}`,
        alignItems: 'right',
        padding: 20,
        // backgroundColor: '#fff',
        zIndex: 999
      }
    },
    MuiBackdrop: {
      root: {
        backgroundColor: 'rgba(0,0,0,.4)'
      }
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: 'rgba(0,0,0,.8)'
      }
    },
    MuiButton: {
      root: {
        // height: 42,
        minWidth: 'auto',
        whiteSpace: 'nowrap',
        fontSize: font.fontSize
      }
    },
    MuiIconButton: {
      colorPrimary: {
        backgroundColor: palette.hover,
        '&:hover': {
          backgroundColor: palette.hover2
        }
      }
    },
    MuiAlert: {
      message: {
        fontSize: font.size
      }
    },
    MuiAvatar: {
      root: {
        fontSize: typography.fontSize
      },
      colorDefault: {
        color: palette.primary.main
      }
    },
    MuiTabs: {
      root: {
        minHeight: 42,
        maxHeight: 42,
        borderRadius: shape.borderRadius,
        border: `1px solid ${palette.primary.main}`
      }
    },
    MuiTab: {
      root: {
        minHeight: 40,
        maxHeight: 40,
        minWidth: 0,
        '@media (min-width: 0px)': {
          minWidth: 0
        }
      },
      textColorPrimary: {
        color: palette.primary.main,
        zIndex: 10,
        '&$selected': {
          color: '#fff'
        }
      }
    },
    PrivateTabIndicator: {
      root: {
        height: 40,
        zIndex: 9,
        borderRadius: shape.borderRadius / 2
      }
    },
    MuiListItemIcon: {
      root: {
        minWidth: 40
      }
    },
    MuiInputBase: {
      root: {
        minHeight: 54,
        lineHeight: font.lineHeight
      }
    }
  }
})

export default light
