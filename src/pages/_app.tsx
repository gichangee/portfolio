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
  title: "박기창 | Back-End Dev",
  description: "안녕하세요, 백엔드 개발자 박기창입니다.",
  canonical: "https://www.naver.com/",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://www.naver.com/",
    title: "박기창 | Back-End Dev",
    site_name: "박기창 | Back-End Dev",
    images: [
      {
        url: "/share.png",
        width: 285,
        height: 167,
        alt: "박기창 | Back-End Dev",
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
      content: "박기창 | Back-End Dev",
    },
    {
      name: "msapplication-tooltip",
      content: "박기창 | Back-End Dev",
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


