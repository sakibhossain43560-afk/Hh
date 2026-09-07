export interface PlayerResponse {
  success: boolean;
  cached: boolean;
  apiUsed: string;
  latencyMs: number;
  data?: FreeFireAccountData;
  error?: string;
}

export interface FreeFireAccountData {
  basicInfo?: {
    accountId: string;
    accountType?: number;
    nickname: string;
    region: string;
    level: number;
    exp: number;
    bannerId?: number;
    headPic?: number;
    rank?: number;
    rankingPoints?: number;
    role?: number;
    badgeId?: number;
    seasonId?: number;
    liked?: number;
    lastLoginAt?: string;
    csRank?: number;
    weaponSkinShows?: number[];
    pinId?: number;
    maxRank?: number;
    csMaxRank?: number;
    accountPrefers?: Record<string, any>;
    createAt?: string;
    externalIconInfo?: {
      status?: string;
      showType?: string;
    };
    primeInfo?: Record<string, any>;
  };
  profileInfo?: {
    avatarId?: number;
    skinColor?: number;
    clothes?: number[];
    equipedSkills?: number[];
    isSelected?: boolean;
    isSelectedAwaken?: boolean;
  };
  clanBasicInfo?: {
    clanId?: string;
    clanName?: string;
    captainId?: string;
    clanLevel?: number;
    capacity?: number;
    memberNum?: number;
  };
  captainBasicInfo?: {
    accountId?: string;
    accountType?: number;
    nickname?: string;
    region?: string;
    level?: number;
    rank?: number;
    rankingPoints?: number;
    badgeId?: number;
    seasonId?: number;
    liked?: number;
    lastLoginAt?: string;
    csRank?: number;
    maxRank?: number;
    csMaxRank?: number;
    createAt?: string;
  };
  petInfo?: {
    id?: number;
    level?: number;
    exp?: number;
    isSelected?: boolean;
    skinId?: number;
    selectedSkillId?: number;
  };
  socialInfo?: {
    accountId?: string;
    gender?: string;
    language?: string;
    timeActive?: string;
    modePrefer?: string;
    signature?: string;
    rankShow?: string;
  };
  diamondCostRes?: {
    diamondCost?: number;
  };
  creditScoreInfo?: {
    score?: number;
  };
  [key: string]: any;
}

export interface ApiStatusItem {
  id: string;
  name: string;
  status: 'online' | 'degraded' | 'offline';
  latencyMs: number;
}
