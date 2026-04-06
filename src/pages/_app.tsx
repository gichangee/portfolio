import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";

import * as gtag from "../lib/gtag";
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;
/**
 * @description SEO를 위해 본인의 정보로 수정해주세요.
 */


const DEFAULT_SEO = {
  title: "박기창 | WMS Backend Engineer",
  description: "물류 프로세스의 최적화를 고민하는 WMS 백엔드 엔지니어 박기창입니다.",
  canonical: "https://www.naver.com/",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://www.naver.com/",
    title: "박기창 | WMS Backend Engineer",
    site_name: "박기창 | WMS Backend Engineer",
    images: [
      {
        url: "/share.png",
        width: 285,
        height: 167,
        alt: "박기창 | WMS Backend Engineer",
      },
    ],
  },
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
  ],
  additionalMetaTags: [
    {
      name: "application-name",
      content: "박기창 | WMS Backend Engineer",
    },
    {
      name: "msapplication-tooltip",
      content: "박기창 | WMS Backend Engineer",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    // 여기에 Google 사이트 확인을 위한 메타태그 추가
    {
      name: "google-site-verification",
      content: "0DBnuk0JKs5O9G0_Q7gsmTqwxQ7_unsr6bpuE8DFN8M",
    },
  ],
};

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
    {/* Global Site Tag (gtag.js) - Google Analytics */}
    <Script
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
    />
    <Script
      id="gtag-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_TRACKING_ID}', {
        page_path: window.location.pathname,
      });
    `,
      }}
    />
      <DefaultSeo {...DEFAULT_SEO} />
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};



export default App;


