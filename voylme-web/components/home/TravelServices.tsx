"use client";
import { Car, Hotel, Plane, Ship, Ticket } from "lucide-react";
import { useVoylmeHomeLocale } from "@/lib/voylme/i18n/home";
export default function TravelServices(){
  const {copy,isRtl}=useVoylmeHomeLocale();
  const icons=[Plane,Hotel,Car,Ticket,Ship];
  return <section className={`voylme-final-services ${isRtl?"voylme-rtl":""}`} dir={isRtl?"rtl":"ltr"} aria-label="Travel services"><div className="voylme-final-services-card">{copy.services.map((label,i)=>{const Icon=icons[i];return <button key={i} type="button" disabled={i!==0} aria-current={i===0?"page":undefined} className={i===0?"active":""}><Icon size={16} strokeWidth={2.2}/><span>{label}</span></button>})}</div></section>;
}
