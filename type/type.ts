export type BottomStackParam = {
  홈: undefined;
  쿠폰: undefined;
  공유: undefined;
  MY: undefined;
};

export type LoginIntroParam = {
  LoginMain: undefined;
  LoginIntro: undefined;
  Bottom: { screen: string } | undefined;
};

export type RootStackParam = {
  Bottom: { screen: string } | undefined;
  Home: undefined;
  LoginMain: undefined;
  LoginIntro: undefined;
  AddCoupon: undefined;
  AddCouponConfirm: undefined;
};

export type BottomStackParams = {
  Bottom: { screen: string } | undefined;
};

export type UserData = {
  nickname: string;
  thumbnailImageUrl: string;
};

export type AddCouponParam = {
  AddCoupon: undefined;
};

export interface Coupon {
  id: string;
  couponName: string;
  couponNumber: string;
  img: string | null;
  category: string;
  period: string;
}

export type CouponListParam = {
  AddCouponConfirm: {
    coupons: Coupon;
  };
};
