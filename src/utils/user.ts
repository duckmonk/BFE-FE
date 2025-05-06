interface UserInfo {
  userId: number;
  userName: string;
  userType: string;
}

export const saveUserInfo = (data: any) => {
  localStorage.setItem('user', JSON.stringify({
    userId: data.userId,
    userName: data.userName,
    userType: data.userType
  }));
};

export const getUserInfo = (): UserInfo | null => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch (e) {
    return null;
  }
};

export const getUserType = (): string | null => {
  const userInfo = getUserInfo();
  return userInfo?.userType || null;
};

export const clearUserInfo = () => {
  localStorage.removeItem('user');
}; 