export const GENDER_OPTIONS = [
  { label: "NAM", value: "MALE" },
  { label: "NỮ", value: "FEMALE" },
  { label: "KHÁC", value: "OTHER" },
];

export const GENDER_CALL = {
  MALE: "anh",
  FEMALE: "chị",
  OTHER: "bạn",
};

export const getTimeHello = (hour) => {
  if (0 <= hour && hour < 10) return "buổi sáng";
  if (10 <= hour && hour < 15) return "buổi trưa";
  if (15 <= hour && hour < 18) return "buổi chiều";
  if (18 <= hour) return "buổi tối";
};
