import React, { useState } from "react";

export function CookieBanner() {
  const [cookieBanner, setCookieBanner] = useState(
    typeof window === "undefined" ||
      window.localStorage.getItem("cookiebanner") === "closed"
  );

  return (
    <div>
      {cookieBanner ? (
        <></>
      ) : (
        <div className="bg-black">
          <div className="max-w-screen-xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between flex-wrap">
              <div className="w-0 flex-1 flex items-center">
                <p className="ml-3 font-medium text-white">
                  <span className="md:hidden">
                    {/* We make use of functional cookies. */}
                    機能性cookieを使用します。
                  </span>
                  <span className="hidden md:inline">
                    {/*
                    To ensure a good user experience, we make use of functional
                    cookies.
                    */}
                    ユーザーエクスペリエンスを良くするため機能性cookieを使用します。
                  </span>
                </p>
              </div>
              <div className="rounded-md shadow-sm">
                <button
                  onClick={() => {
                    window.localStorage.setItem("cookiebanner", "closed");
                    setCookieBanner(true);
                  }}
                  className="flex items-center justify-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-gray-600 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline transition ease-in-out duration-150"
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
