import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor() {}

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
    const tomorrowDate = new Date(currentDate);
    tomorrowDate.setDate(currentDate.getDate() + 1);

    const year = tomorrowDate.getFullYear();
    const month = (tomorrowDate.getMonth() + 1).toString().padStart(2, '0');
    const day = tomorrowDate.getDate().toString().padStart(2, '0');
    const hours = tomorrowDate.getHours().toString().padStart(2, '0');
    const minutes = tomorrowDate.getMinutes().toString().padStart(2, '0');
    const seconds = tomorrowDate.getSeconds().toString().padStart(2, '0');

    const tomorrow = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    console.log(tomorrow);
    
    return tomorrow;
  }

  public getDateTimeNowInit(): string {
    const currentDate = new Date();
    const now = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${currentDate
      .getDate()
      .toString()
      .padStart(2, '0')} ${'01'}:${'00'}:${'00'}`;
    return now;
  }
  public getDateTimeTomorrowInit(): string {
    const currentDate = new Date();
    const tomorrowDate = new Date(currentDate);
    tomorrowDate.setDate(currentDate.getDate() + 1);

    const year = tomorrowDate.getFullYear();
    const month = (tomorrowDate.getMonth() + 1).toString().padStart(2, '0');
    const day = tomorrowDate.getDate().toString().padStart(2, '0');
    const hours = tomorrowDate.getHours().toString().padStart(2, '0');
    const minutes = tomorrowDate.getMinutes().toString().padStart(2, '0');
    const seconds = tomorrowDate.getSeconds().toString().padStart(2, '0');

    const tomorrow = `${year}-${month}-${day} ${'01'}:${'00'}:${'00'}`;
    console.log(tomorrow);
    
    return tomorrow;
  }
  

  public convertDateInputToString(date: string): string {
    const dateOrg = new Date(date);

    // Obtener el año, mes y día
    const year = dateOrg.getFullYear();
    const month = String(dateOrg.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11, por eso se suma 1
    const day = String(dateOrg.getDate()).padStart(2, '0');

    // Crear la fecha en el nuevo formato
    return `${year}-${month}-${day}`;
  }

  public convertDateInputToStringWithTime(date: string, time: string): string {
    const dateOrg = new Date(date);

    // Obtener el año, mes y día
    const year = dateOrg.getFullYear();
    const month = String(dateOrg.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11, por eso se suma 1
    const day = String(dateOrg.getDate()).padStart(2, '0');

    // Crear la fecha en el nuevo formato
    return `${year}-${month}-${day} ${time}:00`;
  }
}
