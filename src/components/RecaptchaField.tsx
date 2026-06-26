"use client";

import ReCAPTCHA from "react-google-recaptcha";

interface RecaptchaFieldProps {
  siteKey: string;
  onChange: (token: string | null) => void;
}

export default function RecaptchaField({ siteKey, onChange }: RecaptchaFieldProps) {
  return <ReCAPTCHA sitekey={siteKey} onChange={onChange} />;
}
