/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useEffect } from "react";

import { sepolia } from "viem/chains";
import { useAccount, useSwitchChain } from "wagmi";

import {
  HomeSection,
  BadgeDetailsSection,
  CheckinSection,
  CheckoutSection,
  ErrorChainSection,
  GiveBadgeSection,
  MyBadgeSection,
  PreCheckinSection,
  ShareSection,
  AdminSection,
} from "@/components/04-templates/";
import { useNotify } from "@/hooks";

export default function renderPage({ params }: { params: { slug: [string] } }) {
  const { notifyError } = useNotify();
  const { switchChain } = useSwitchChain();
  const { chainId, address } = useAccount();

  useEffect(() => {
    if (address) {
      if (chainId !== sepolia.id) {
        notifyError({
          title: "Unsupported network",
          message:
            "Please switch to the sepolia network to use this application.",
        });
        switchChain({ chainId: sepolia.id });
      }
    }
  }, [chainId]);

  if (chainId === sepolia.id) {
    switch (params.slug[0]) {
      case "pre-checkin":
        return <PreCheckinSection />;
      case "checkin":
        return <CheckinSection />;
      case "checkout":
        return <CheckoutSection />;
      case "share":
        return <ShareSection />;
      case "my-badges":
        return <MyBadgeSection />;
      case "my-badge-details":
        return <BadgeDetailsSection />;
      case "give-badge":
        return <GiveBadgeSection />;
      case "admin":
        return <AdminSection />;
      default:
        return <HomeSection />;
    }
  } else if (!address) return <HomeSection />;
  else return <ErrorChainSection />;
}
