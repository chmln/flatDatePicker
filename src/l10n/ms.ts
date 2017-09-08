/* Malaysian locals for flatpickr */
import { CustomLocale } from "types/locale"
import { FlatpickrFn } from "types/instance"

const fp: FlatpickrFn = ((window as any).flatpickr as FlatpickrFn) || { l10ns: {}}

export const Malaysian: CustomLocale = {

  weekdays: {
  	shorthand: ["Min", "Isn", "Sel", "Rab", "Kha", "Jum", "Sab"],
  	longhand: ["Minggu", "Isnin", "Selasa", "Rabu", "Khamis", "Jumaat", "Sabtu"]
  },

  months: {
  	shorthand: ["Jan", "Feb", "Mac", "Apr", "Mei", "Jun", "Jul", "Ogo", "Sep", "Okt", "Nov", "Dis"],
  	longhand: ["Januari", "Februari", "Mac", "April", "Mei", "Jun", "Julai", "Ogos", "September", "Oktober", "November", "Disember"]
  },

  firstDayOfWeek: 1,

  ordinal: () => {
  	return ""
  },
}

export default fp.l10ns

