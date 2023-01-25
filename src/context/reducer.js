export const reducer = (state, action) => {
  switch (action.type) {
    case "theme":
      return { ...state, theme: action.payload };
    case "docs":
      return { ...state, docs: action.payload };
    case "classId":
      return { ...state, classId: action.payload };
    case "signin":
      return { ...state, user: action.payload };
    case "bookmark":
      return { ...state, user: { ...state.user, bookmark: action.payload } };
    case "logout":
      return { ...state, user: false };
    default:
      return state;
  }
};
