class ComparadorDiaHoras {
  constructor() {}

  compare(date: string | Date): {
    dias: number;
    horas: number;
    minutos: number;
    segundos: number;
  } {
     const dataHoraBrasil = new Date();
     const dataHoraUtc = new Date(
       dataHoraBrasil.getTime() +
         dataHoraBrasil.getTimezoneOffset() * 60000 -
         3 * 60 * 60 * 1000, // Subtrai 3 horas
     );

     const targetDate = new Date(date);
     let diffTime = Math.abs(targetDate.valueOf() - dataHoraUtc.valueOf());
     let dias = diffTime / (24 * 60 * 60 * 1000);
     let horas = (dias % 1) * 24;
     let minutos = (horas % 1) * 60;
     let segundos = (minutos % 1) * 60;

     [dias, horas, minutos, segundos] = [
       Math.floor(dias),
       Math.floor(horas),
       Math.floor(minutos),
       Math.floor(segundos),
     ];

     return {
       dias,
       horas,
       minutos,
       segundos,
     };
  }
}

export default new ComparadorDiaHoras();
