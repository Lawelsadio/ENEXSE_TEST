// Constantes de style centralisées pour le quiz
export const COLORS = {
  primary: "#3399FF",
  secondary: "#CCCCCC", 
  success: "#28a745",
  danger: "#dc3545",
  dark: "#999999",
  white: "#FFFFFF",
  black: "#000000"
};

export const SPACING = {
  xs: 2,
  sm: 5,
  md: 10,
  lg: 15,
  xl: 20
};

export const RADIUS = {
  sm: 10,
  md: 20,
  lg: 50
};

export const LAYOUT = {
  leftColumnWidth: "40%",
  rightColumnWidth: "40%",
  gap: "5%",
  questionWidth: "65%",
  optionWidth: "35%",
  headerHeight: 45
};

// Styles réutilisables
export const COMMON_STYLES = {
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.sm,
    padding: SPACING.md
  },
  
  grayContainer: {
    backgroundColor: COLORS.secondary,
    borderRadius: RADIUS.sm,
    padding: SPACING.md
  },

  button: {
    border: "none",
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "1rem"
  },

  flexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
};
