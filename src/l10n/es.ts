/* Spanish locals for flatpickr */
import { CustomLocale } from "types/locale"
import { FlatpickrFn } from "types/instance"

const fp: FlatpickrFn = ((window as any).flatpickr as FlatpickrFn) || { l10ns: {}}

export const Spanish: CustomLocale = {
  weekdays: {
  	shorthand: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
  	longhand: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
  },

  months: {
  	shorthand: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
  	longhand: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  },

  ordinal: () => {
  	return "º"
  },

  firstDayOfWeek: 1,
}

fp.l10ns.es = Spanish;

export default fp.l10ns

