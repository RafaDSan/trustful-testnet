export const EAS_CONTRACT_SEPOLIA = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e";

export const RESOLVER_CONTRACT_SEPOLIA =
  "0x44965e78C13F719998B8A7e590E8CB5CFeacb36B";

export enum ROLES {
  ROOT = "0x79e553c6f53701daa99614646285e66adb98ff0fcc1ef165dd2718e5c873bee6",
  MANAGER = "0x241ecf16d79d0f8dbfb92cbc07fe17840425976cf0667f022fe9877caa831b08",
  VILLAGER = "0x7e8ac59880745312f8754f56b69cccc1c6b2112d567ccf50e4e6dc2e39a7c67a",
}

export interface Schemas {
  uid: `0x${string}`;
  data: string;
  revocable: boolean;
  allowedRole: string[];
}

export const TRUSTFUL_SCHEMAS: { [key: string]: Schemas } = {
  ATTEST_MANAGER: {
    uid: "0x81b592a85d86cc9ce47c01e1076787e1218ac8bd8e2b09f2a910d583b2d40ba0",
    data: "string role",
    revocable: true,
    allowedRole: [ROLES.ROOT],
  },
  ATTEST_VILLAGER: {
    uid: "0x3d618c3ac7bd930dd10bd9e28ba56d712c3bc6874d899d0c4c7bb2edbf314696",
    data: "string status",
    revocable: false,
    allowedRole: [ROLES.MANAGER],
  },
  ATTEST_EVENT: {
    uid: "0x078f2d4bf5f42651b4155de51d46a84e3a85822e1457cde3192c93f20d1f8d93",
    data: "string title,string comment",
    revocable: false,
    allowedRole: [ROLES.VILLAGER],
  },
  ATTEST_RESPONSE: {
    uid: "0x730e09c7f405bce03dd728dc7e061ae702184ca394587ae0c73d4ff3fb98d477",
    data: "bool status",
    revocable: true,
    allowedRole: [ROLES.VILLAGER],
  },
};

export interface BadgeTitle {
  title: string;
  uid: `0x${string}`;
  allowComment: boolean;
  revocable: boolean;
  data: string;
  allowedRole: string[];
}

export const TRUSTFUL_BADGE_TITLES: BadgeTitle[] = [
  {
    title: "Manager",
    uid: TRUSTFUL_SCHEMAS.ATTEST_MANAGER.uid,
    allowComment: false,
    revocable: true,
    data: TRUSTFUL_SCHEMAS.ATTEST_MANAGER.data,
    allowedRole: TRUSTFUL_SCHEMAS.ATTEST_MANAGER.allowedRole,
  },
  {
    title: "Check-in",
    uid: TRUSTFUL_SCHEMAS.ATTEST_VILLAGER.uid,
    allowComment: false,
    revocable: false,
    data: TRUSTFUL_SCHEMAS.ATTEST_VILLAGER.data,
    allowedRole: TRUSTFUL_SCHEMAS.ATTEST_VILLAGER.allowedRole,
  },
  {
    title: "Check-out",
    uid: TRUSTFUL_SCHEMAS.ATTEST_VILLAGER.uid,
    allowComment: true,
    revocable: false,
    data: TRUSTFUL_SCHEMAS.ATTEST_VILLAGER.data,
    allowedRole: TRUSTFUL_SCHEMAS.ATTEST_VILLAGER.allowedRole,
  },
];

export const ALCHEMY_PUBLIC_RPC =
  process.env.ALCHEMY_RPC_URL
