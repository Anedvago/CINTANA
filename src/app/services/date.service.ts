import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor() { }

  public getDateTimeNow(): string {
    const currentDate = new Date();
    const now = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${currentDate
        .getDate()
        .toString()
        .padStart(2, '0')} ${currentDate
          .getHours()
          .toString()
          .padStart(2, '0')}:${currentDate
            .getMinutes()
            .toString()
            .padStart(2, '0')}:${currentDate
              .getSeconds()
              .toString()
              .padStart(2, '0')}`;
    return now;
  }
  public getDateTimeTomorrow(): string {
    const currentDate = new Date();
    const tomorrow = `${currentDate.getFullYear()}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${(currentDate.getDate() + 1)
        .toString()
        .padStart(2, '0')} ${currentDate
          .getHours()
          .toString()
          .padStart(2, '0')}:${currentDate
            .getMinutes()
            .toString()
            .padStart(2, '0')}:${currentDate
              .getSeconds()
              .toString()
              .padStart(2, '0')}`;
    return tomorrow;
  }

  public convertDateInputToString(date: string): string {
    const dateOrg = new Date(date);

    // Obtener el año, mes y día
    const year = dateOrg.getFullYear();
    const month = String(dateOrg.getMonth() + 1).padStart(2, "0"); // Meses van de 0 a 11, por eso se suma 1
    const day = String(dateOrg.getDate()).padStart(2, "0");

    // Crear la fecha en el nuevo formato
    return `${year}-${month}-${day}`;
  }
}
