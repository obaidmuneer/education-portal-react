export const reducer = (state, action) => {
  switch (action.type) {
    case "theme":
      return { ...state, theme: action.payload };
    case "docs":
      return { ...state, docs: action.payload };
    case "classId":
      return { ...state, classId: action.payload };
    default:
      return state;
  }
};
