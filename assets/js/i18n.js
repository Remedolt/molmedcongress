/* Icon set + i18n dictionary + language helpers, shared across all pages */

var ICON_PATHS = {
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  users: '<circle cx="9" cy="8" r="3.2"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><circle cx="17.5" cy="9" r="2.6"/><path d="M15.8 14.2c2.7.4 4.7 2.5 4.7 5.8"/>',
  flask: '<path d="M10 3h4"/><path d="M10.5 3v6.2L5.6 18a2 2 0 0 0 1.8 3h9.2a2 2 0 0 0 1.8-3l-4.9-8.8V3"/><path d="M7.5 15h9"/>',
  file: '<path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h6M9 9h2"/>',
  ticket: '<path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z"/><path d="M13 6v12" stroke-dasharray="2.5 2.5"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6"/><circle cx="12" cy="7.5" r="0.9" fill="currentColor" stroke="none"/>',
  phone: '<path d="M6.6 3.5l3 .8.9 3.3-2 1.8a13 13 0 0 0 5.6 5.6l1.8-2 3.3.9.8 3a2 2 0 0 1-2 2.4C10.6 19.1 4.9 13.4 4.2 6.6a2 2 0 0 1 2.4-3.1z"/>',
  home: '<path d="M4 11.5L12 4l8 7.5"/><path d="M6 10v9a1 1 0 0 0 1 1h4v-6h2v6h4a1 1 0 0 0 1-1v-9"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.7 2.6 4.2 5.7 4.2 9s-1.5 6.4-4.2 9c-2.7-2.6-4.2-5.7-4.2-9s1.5-6.4 4.2-9z"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M3.5 9.5h17"/><path d="M8 3v4M16 3v4"/><path d="M7.5 13h2M11 13h2M14.5 13h2M7.5 16.5h2M11 16.5h2"/>',
  award: '<circle cx="12" cy="9" r="5.5"/><path d="M8.5 13.8L7 21l5-2.4L17 21l-1.5-7.2"/>',
  download: '<path d="M12 3v12"/><path d="M7.5 10.5L12 15l4.5-4.5"/><path d="M4.5 18h15v2h-15z"/>',
  shield: '<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/>',
  arrow: '<path d="M4 12h16"/><path d="M13 6l6 6-6 6"/>',
  building: '<rect x="4" y="3" width="10" height="18" rx="1"/><rect x="15" y="8" width="5" height="13" rx="1"/><path d="M7 7h1M10 7h1M7 10.5h1M10 10.5h1M7 14h1M10 14h1"/>',
  sun: '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
  moon: '<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"/>'
};
function iconSvg(name, size){
  size = size || 24;
  return '<svg width="'+size+'" height="'+size+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(ICON_PATHS[name]||ICON_PATHS.info)+'</svg>';
}
function renderIcons(){
  document.querySelectorAll('.ic[data-icon]').forEach(function(el){
    var size = parseInt(el.getAttribute('data-size')||'24',10);
    el.innerHTML = iconSvg(el.getAttribute('data-icon'), size);
  });
}

/* =========================================================
   i18n dictionary
   ========================================================= */

var I18N = {
  preview_form_note: {tr:'Not: Bu statik HTML paketinde form bir arka uca bağlı değildir. Gerçek gönderim ve veritabanı kaydı, projenin PHP/veritabanı sürümünde çalışır.', en:'Note: in this static HTML bundle, the form is not wired to a backend. Real submission and database storage run in the PHP/database version of the project.'},
  brand_title: {tr:'Moleküler Tıp Kongresi', en:'Molecular Medicine Congress'},
  venue_short: {tr:'İstanbul Nişantaşı Üniversitesi', en:'Istanbul Nişantaşı University'},
  venue_full: {tr:'İstanbul Nişantaşı Üniversitesi, NeoTech Kampüsü', en:'Istanbul Nişantaşı University, NeoTech Campus'},
  lang_badge: {tr:'Türkçe / İngilizce', en:'Turkish / English'},
  partner_university: {tr:'İstanbul Nişantaşı Üniversitesi', en:'Istanbul Nişantaşı University'},

  nav_home:{tr:'Ana Sayfa',en:'Home'},
  nav_kongre:{tr:'Kongre',en:'Congress'},
  nav_davet:{tr:'Davet',en:'Invitation'},
  nav_kurullar:{tr:'Kurullar',en:'Committees'},
  nav_program:{tr:'Bilimsel Program',en:'Scientific Program'},
  nav_bildiri:{tr:'Bildiri Gönderimi',en:'Abstract Submission'},
  nav_kayit:{tr:'Kayıt & Konaklama',en:'Registration & Accommodation'},
  nav_genel:{tr:'Genel Bilgiler',en:'General Information'},
  nav_iletisim:{tr:'İletişim',en:'Contact'},
  nav_register_cta:{tr:'Hemen Kayıt Ol',en:'Register Now'},

  hero_kicker:{tr:'Turkish Society of Molecular Medicine · 1999\'dan beri',en:'Turkish Society of Molecular Medicine · since 1999'},
  hero_title:{tr:'XI. Uluslararası Moleküler Tıp Kongresi<br>& I. Multidisipliner Wellness ve Longevity Sempozyumu',en:'XI. International Congress of Molecular Medicine<br>& I. Multidisciplinary Wellness and Longevity Symposium'},
  hero_theme:{tr:'“Kişiselleştirilmiş Tıbbın ve Longevity’nin Geleceği”',en:'“The Future of Personalized Medicine and Longevity”'},
  hero_date_label:{tr:'Tarih',en:'Date'},
  hero_venue_label:{tr:'Yer',en:'Venue'},
  hero_cta_register:{tr:'Kayıt Ol',en:'Register'},
  hero_cta_abstract:{tr:'Bildiri Gönder',en:'Submit Abstract'},
  hero_cta_program:{tr:'Bilimsel Programı Gör',en:'View Scientific Program'},

  countdown_title:{tr:'Kongreye Kalan Süre',en:'Countdown to the Congress'},
  countdown_days:{tr:'Gün',en:'Days'},
  countdown_hours:{tr:'Saat',en:'Hours'},
  countdown_minutes:{tr:'Dakika',en:'Minutes'},
  countdown_seconds:{tr:'Saniye',en:'Seconds'},

  highlights_title:{tr:'Kongre Hakkında',en:'About the Congress'},
  highlights_body:{tr:'1999 yılından bu yana Türk Moleküler Tıp Derneği öncülüğünde düzenlenen kongremiz, bu yıl 11. kez moleküler tıp alanındaki güncel gelişmeleri bir araya getiriyor. İlk kez düzenlenen Multidisipliner Wellness ve Longevity Sempozyumu ile birlikte; temel bilim, klinik uygulama, kişiselleştirilmiş tıp ve sağlıklı yaşam uzunluğu (longevity) alanlarını tek çatı altında buluşturuyoruz.',en:'Organized since 1999 under the leadership of the Turkish Society of Molecular Medicine, our congress brings together the latest developments in molecular medicine for the 11th time this year. Together with the first Multidisciplinary Wellness and Longevity Symposium, we unite basic science, clinical practice, personalized medicine, and longevity under one roof.'},
  highlights_card1_title:{tr:'Uluslararası Konuşmacılar',en:'International Speakers'},
  highlights_card1_body:{tr:'Alanında öncü, yurt içi ve yurt dışından davetli konuşmacılar.',en:'Leading invited speakers from Turkey and abroad.'},
  highlights_card2_title:{tr:'5 Gün Yoğun Bilimsel Program',en:'5 Days of Scientific Program'},
  highlights_card2_body:{tr:'Sözlü sunumlar, poster oturumları, panel ve kurslar.',en:'Oral presentations, poster sessions, panels and courses.'},
  highlights_card3_title:{tr:'Genç Araştırmacı Ödülleri',en:'Young Investigator Awards'},
  highlights_card3_body:{tr:'En iyi sözlü ve poster bildirilere ödül.',en:'Awards for the best oral and poster presentations.'},

  key_dates_title:{tr:'Önemli Tarihler',en:'Key Dates'},
  key_dates_abstract_deadline:{tr:'Bildiri Özeti Son Gönderim Tarihi',en:'Abstract Submission Deadline'},
  key_dates_early_bird:{tr:'Erken Kayıt Son Tarihi',en:'Early Bird Registration Deadline'},
  key_dates_notification:{tr:'Kabul Bildirim Tarihi',en:'Notification of Acceptance'},
  key_dates_congress:{tr:'Kongre Tarihleri',en:'Congress Dates'},
  date_tbd:{tr:'Yakında duyurulacak',en:'To be announced'},

  partners_title:{tr:'Düzenleyen ve Ev Sahibi Kurum',en:'Organizer & Host Institution'},
  home_final_cta_title:{tr:'Bu önemli buluşmada yerinizi ayırtın',en:'Secure your place at this important event'},
  home_final_cta_body:{tr:'Kontenjanlar sınırlıdır, erken kayıt avantajlarından yararlanmak için bugün kaydolun.',en:'Places are limited — register today to benefit from early bird rates.'},

  davet_title:{tr:'Davet',en:'Invitation'},
  davet_body:{tr:'Değerli Meslektaşlarımız,\n\nTürk Moleküler Tıp Derneği olarak 1999 yılından bu yana bilim insanlarını, klinisyenleri ve genç araştırmacıları bir araya getiren geleneksel kongremizin on birincisini, 23–27 Aralık 2026 tarihlerinde İstanbul Nişantaşı Üniversitesi NeoTech Kampüsü\'nde düzenlemekten büyük mutluluk duyuyoruz.\n\nBu yıl kongremize, ilk kez düzenlenecek olan I. Multidisipliner Wellness ve Longevity Sempozyumu da eşlik edecek. \'Kişiselleştirilmiş Tıbbın ve Longevity\'nin Geleceği\' temasıyla; genomik tıp, moleküler tanı yöntemleri, hücresel ve gen tedavileri, sağlıklı yaşlanma ve longevity alanındaki en güncel bilimsel gelişmeleri alanında uzman konuşmacılarla birlikte ele alacağız.\n\nSiz değerli meslektaşlarımızı, öğrencilerimizi ve bu alana gönül vermiş tüm katılımcıları aramızda görmekten onur duyacağız.\n\nSaygılarımızla,\nDüzenleme Kurulu', en:'Dear Colleagues,\n\nAs the Turkish Society of Molecular Medicine, we are delighted to host the eleventh edition of our traditional congress — bringing together scientists, clinicians, and young researchers since 1999 — on 23–27 December 2026 at the NeoTech Campus of Istanbul Nişantaşı University.\n\nThis year, our congress will be accompanied by the first Multidisciplinary Wellness and Longevity Symposium. Under the theme \'The Future of Personalized Medicine and Longevity\', we will explore the latest scientific developments in genomic medicine, molecular diagnostics, cellular and gene therapies, healthy aging, and longevity with expert speakers in the field.\n\nWe would be honored to welcome our esteemed colleagues, students, and all participants dedicated to this field.\n\nSincerely,\nThe Organizing Committee'},

  kurullar_title:{tr:'Kurullar',en:'Committees'},
  kurullar_honorary:{tr:'Onursal Başkanlar',en:'Honorary Presidents'},
  kurullar_congress_president:{tr:'Kongre Başkanı',en:'Congress President'},
  kurullar_organizing:{tr:'Düzenleme Kurulu',en:'Organizing Committee'},
  kurullar_scientific:{tr:'Bilim Kurulu',en:'Scientific Committee'},
  kurullar_international:{tr:'Uluslararası Danışma Kurulu',en:'International Advisory Board'},
  kurullar_placeholder_note:{tr:'Kurul üyelerinin isim listesi yakında bu sayfada yayınlanacaktır.',en:'The list of committee members will be published on this page soon.'},

  program_title:{tr:'Bilimsel Program',en:'Scientific Program'},
  program_intro:{tr:'Detaylı bilimsel program yakında bu sayfada yayınlanacaktır. Kongre 23–27 Aralık 2026 tarihleri arasında, her gün 10.00–17.00 saatleri arasında gerçekleştirilecektir.',en:'The detailed scientific program will be published on this page soon. The congress will take place between 23–27 December 2026, daily from 10.00 to 17.00.'},
  program_download:{tr:'Programı PDF Olarak İndir (yakında)',en:'Download Program as PDF (coming soon)'},
  program_session_note:{tr:'Oturum detayları yakında eklenecektir.',en:'Session details will be added soon.'},

  genel_title:{tr:'Genel Bilgiler',en:'General Information'},
  genel_venue_title:{tr:'Kongre Yeri',en:'Congress Venue'},
  genel_venue_body:{tr:'İstanbul Nişantaşı Üniversitesi, NeoTech Kampüsü, İstanbul, Türkiye.',en:'Istanbul Nişantaşı University, NeoTech Campus, Istanbul, Turkey.'},
  genel_dates_title:{tr:'Tarih ve Saatler',en:'Dates and Hours'},
  genel_dates_body:{tr:'23–27 Aralık 2026, her gün 10.00–17.00',en:'23–27 December 2026, daily 10.00–17.00'},
  genel_language_title:{tr:'Kongre Dili',en:'Congress Language'},
  genel_language_body:{tr:'Türkçe ve İngilizce (simultane çeviri sağlanacaktır).',en:'Turkish and English (simultaneous translation will be provided).'},
  genel_accommodation_title:{tr:'Konaklama ve Ulaşım',en:'Accommodation and Transportation'},
  genel_accommodation_body:{tr:'Anlaşmalı otel bilgileri ve ulaşım detayları yakında bu sayfada paylaşılacaktır.',en:'Details of partner hotels and transportation will be shared on this page soon.'},
  genel_visa_title:{tr:'Vize ve Davet Mektubu',en:'Visa and Invitation Letter'},
  genel_visa_body:{tr:'Vize işlemleri için davet mektubu talep eden katılımcılar İletişim sayfasındaki e-posta adresi üzerinden bizimle iletişime geçebilir.',en:'Participants who require an invitation letter for visa procedures may contact us via the email address on the Contact page.'},

  iletisim_title:{tr:'İletişim',en:'Contact'},
  iletisim_org_title:{tr:'Düzenleyen Kurum',en:'Organizer'},
  iletisim_email:{tr:'E-posta',en:'Email'},
  iletisim_phone:{tr:'Telefon',en:'Phone'},
  iletisim_form_title:{tr:'Bize Yazın',en:'Send Us a Message'},
  iletisim_form_name:{tr:'Ad Soyad',en:'Full Name'},
  iletisim_form_email:{tr:'E-posta',en:'Email'},
  iletisim_form_subject:{tr:'Konu',en:'Subject'},
  iletisim_form_message:{tr:'Mesajınız',en:'Your Message'},
  iletisim_form_submit:{tr:'Gönder',en:'Send'},

  kayit_title:{tr:'Kayıt & Konaklama',en:'Registration & Accommodation'},
  kayit_intro:{tr:'Kongreye katılmak için aşağıdaki formu eksiksiz doldurunuz. Form gönderildikten sonra ödeme adımına yönlendirileceksiniz. Kaydınız, ödemeniz tarafımızca onaylandıktan sonra kesinleşecektir.',en:'Please fill in the form below completely to attend the congress. After submitting the form, you will be redirected to the payment step. Your registration will be finalized once your payment is confirmed by us.'},
  kayit_fees_title:{tr:'Kayıt Ücretleri',en:'Registration Fees'},
  kayit_fees_note:{tr:'Güncel kayıt ücretleri yakında bu sayfada yayınlanacaktır.',en:'Current registration fees will be published on this page soon.'},

  form_first_name:{tr:'Ad',en:'First Name'},
  form_last_name:{tr:'Soyad',en:'Last Name'},
  form_title:{tr:'Unvan',en:'Academic Title'},
  form_title_placeholder:{tr:'Örn. Prof. Dr., Doç. Dr., Dr., Öğrenci',en:'e.g. Prof., Assoc. Prof., Dr., Student'},
  form_email:{tr:'E-posta',en:'Email'},
  form_phone:{tr:'Telefon',en:'Phone'},
  form_institution:{tr:'Kurum',en:'Institution'},
  form_country:{tr:'Ülke',en:'Country'},
  form_category:{tr:'Katılımcı Kategorisi',en:'Participant Category'},
  form_category_academic:{tr:'Akademisyen / Hekim',en:'Academic / Physician'},
  form_category_student:{tr:'Öğrenci',en:'Student'},
  form_category_foreign:{tr:'Yabancı Katılımcı',en:'Foreign Participant'},
  form_category_listener:{tr:'Dinleyici',en:'Listener'},
  form_participation_type:{tr:'Katılım Şekli',en:'Participation Type'},
  form_participation_inperson:{tr:'Yüz Yüze',en:'In Person'},
  form_participation_online:{tr:'Online',en:'Online'},
  form_invoice_type:{tr:'Fatura Tipi',en:'Invoice Type'},
  form_invoice_individual:{tr:'Bireysel',en:'Individual'},
  form_invoice_institutional:{tr:'Kurumsal',en:'Institutional'},
  form_notes:{tr:'Eklemek istediğiniz notlar',en:'Additional notes'},
  form_kvkk:{tr:'Kişisel verilerimin kongre kaydı amacıyla işlenmesini kabul ediyorum.',en:'I consent to my personal data being processed for congress registration purposes.'},
  form_submit_register:{tr:'Kaydı Tamamla ve Ödemeye Geç',en:'Complete Registration and Proceed to Payment'},
  form_required_note:{tr:'* ile işaretli alanlar zorunludur.',en:'Fields marked with * are required.'},

  bildiri_title:{tr:'Bildiri Gönderimi',en:'Abstract Submission'},
  bildiri_intro:{tr:'Bildiri özetinizi aşağıdaki form aracılığıyla gönderebilirsiniz. Gönderiminiz Bilim Kurulu tarafından değerlendirildikten sonra sonuç e-posta adresinize bildirilecektir.',en:'You can submit your abstract using the form below. After your submission is reviewed by the Scientific Committee, the result will be communicated to your email address.'},
  form_abstract_title:{tr:'Bildiri Başlığı',en:'Abstract Title'},
  form_abstract_authors:{tr:'Yazarlar (soyadı, adı sırasıyla, virgülle ayırınız)',en:'Authors (last name, first name, comma separated)'},
  form_abstract_institution:{tr:'Kurum(lar)',en:'Institution(s)'},
  form_abstract_corr_email:{tr:'Sorumlu Yazar E-posta',en:'Corresponding Author Email'},
  form_abstract_corr_phone:{tr:'Sorumlu Yazar Telefon',en:'Corresponding Author Phone'},
  form_abstract_category:{tr:'Sunum Tercihi',en:'Presentation Preference'},
  form_abstract_category_oral:{tr:'Sözlü Bildiri',en:'Oral Presentation'},
  form_abstract_category_poster:{tr:'Poster Bildiri',en:'Poster Presentation'},
  form_abstract_category_either:{tr:'Farketmez',en:'No Preference'},
  form_abstract_topic:{tr:'Konu Alanı',en:'Topic Area'},
  form_abstract_text:{tr:'Bildiri Özeti (en fazla 300 kelime)',en:'Abstract Text (max 300 words)'},
  form_abstract_file:{tr:'Ek Dosya (PDF/DOC, opsiyonel)',en:'Attachment (PDF/DOC, optional)'},
  form_submit_abstract:{tr:'Bildiriyi Gönder',en:'Submit Abstract'},

  thanks_registration_title:{tr:'Kaydınız Alındı',en:'Registration Received'},
  thanks_registration_body:{tr:'Kongre kayıt bilgileriniz tarafımıza ulaştı (önizleme modu). Gerçek sitede bu adımdan sonra ödeme sayfasına yönlendirileceksiniz.',en:'Your congress registration details have been received (preview mode). On the live site you would be redirected to the payment page after this step.'},
  thanks_abstract_title:{tr:'Bildiriniz Alındı',en:'Abstract Received'},
  thanks_abstract_body:{tr:'Bildiri gönderiminiz için teşekkür ederiz (önizleme modu). Değerlendirme sonucu e-posta adresinize iletilecektir.',en:'Thank you for your abstract submission (preview mode). The evaluation result will be sent to your email address.'},
  back_home:{tr:'Ana sayfaya dön',en:'Back to home'},

  error_required_fields:{tr:'Lütfen zorunlu (*) alanları eksiksiz doldurunuz.',en:'Please fill in all required (*) fields.'},
  error_invalid_email:{tr:'Lütfen geçerli bir e-posta adresi giriniz.',en:'Please enter a valid email address.'},

  footer_line1:{tr:'Düzenleyen: Turkish Society of Molecular Medicine (1999)<br>Ev Sahibi Kurum: İstanbul Nişantaşı Üniversitesi',en:'Organized by: Turkish Society of Molecular Medicine (1999)<br>Host Institution: Istanbul Nişantaşı University'},
  footer_quicklinks:{tr:'Hızlı Bağlantılar',en:'Quick Links'},
  footer_copy:{tr:'© 2026 Turkish Society of Molecular Medicine (1999). Tüm hakları saklıdır.',en:'© 2026 Turkish Society of Molecular Medicine (1999). All rights reserved.'}
};


var currentLang = localStorage.getItem('mm_lang') || 'tr';

function applyLang(){
  document.documentElement.setAttribute('lang', currentLang === 'tr' ? 'tr' : 'en');
  document.querySelectorAll('[data-i18n]').forEach(function(el){
    var key = el.getAttribute('data-i18n');
    var entry = I18N[key];
    if(entry) el.textContent = entry[currentLang] || entry.tr;
  });
  document.querySelectorAll('[data-i18n-html]').forEach(function(el){
    var key = el.getAttribute('data-i18n-html');
    var entry = I18N[key];
    if(entry) el.innerHTML = entry[currentLang] || entry.tr;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el){
    var key = el.getAttribute('data-i18n-placeholder');
    var entry = I18N[key];
    if(entry) el.setAttribute('placeholder', entry[currentLang] || entry.tr);
  });
  document.querySelectorAll('[data-lang-btn]').forEach(function(el){
    el.classList.toggle('active', el.getAttribute('data-lang-btn') === currentLang);
  });
  renderProgramDays();
}

function setLang(lang){
  currentLang = lang;
  try{ localStorage.setItem('mm_lang', lang); }catch(e){}
  applyLang();
}

