import { Component, OnInit } from '@angular/core';
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-indexhome',
  templateUrl: './indexhome.component.html',
  styleUrls: ['./indexhome.component.scss']
})
export class IndexhomeComponent implements OnInit {
  interval: any;
  hora1!: string[];
  hora2!: string[];
  currentHora: string[] = ['19', '50', '00'];
  currentAux: string[] = ['18', '30', '00'];
  user = "user1";
  horas: string[] = [];
  minSec: string[] = [];
  tiempoFinal = false;
  tiempoParpaedo = false;
  // 
  dragging = false;
  animating = false;
  claseT1 = "";
  claseT2 = "";
  activo?: boolean = true;

  constructor(private mail: MailService) { }

  ngOnInit(): void {
    for (let i = 0; i < 24; i++) {
      this.horas[i] = this.formatNumber(i);
    }
    for (let i = 0; i < 60; i++) {
      this.minSec[i] = this.formatNumber(i);
    }
    this.setDate();
  }

  setDate() {
    clearInterval(this.interval);
    this.hora1 = this.getCurrentDate(this.currentHora[0], this.currentHora[1], this.currentHora[2], 1);
    this.hora2 = this.getCurrentDate(this.currentAux[0], this.currentAux[1], this.currentAux[2], 2);

    this.interval = setInterval(() => {
      this.hora1 = this.getCurrentDate(this.currentHora[0], this.currentHora[1], this.currentHora[2], 1);
      this.hora2 = this.getCurrentDate(this.currentAux[0], this.currentAux[1], this.currentAux[2], 2);
    }, 1000);
  }

  formatNumber(num: number) {
    return num.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    });
  }

  getCurrentDate(horaS: string, minS: string, secS: string, reloj: number): string[] {
    const fecha = new Date();

    let hora = parseInt(horaS);
    let min = parseInt(minS);
    let sec = parseInt(secS);

    let horax = hora - fecha.getHours();
    let minx = min - fecha.getMinutes();
    let secx = sec - fecha.getSeconds() - 1;

    if (secx < 0) {
      secx = 59 - (fecha.getSeconds() - sec);
      minx--;
    }

    if (minx < 0) {
      minx = 59 - (fecha.getMinutes() - min);
      horax--;
    }

    if (horax < 0) {
      horax = (23 - fecha.getHours()) + hora;
    }
    if ((reloj == 1 && (this.claseT1 == '' || this.claseT1 == 'mostrar')) ||
      (reloj == 2 && (this.claseT2 == '' || this.claseT2 == 'mostrar'))) {

      if (horax == 0 && minx <= 30) {
        this.tiempoParpaedo = true
      }
      else {
        this.tiempoParpaedo = false;
      }

      if (
        horax == 0 && minx == 0 && secx == 0) {
        // 
        this.tiempoFinal = true;
        setTimeout(() => {
          this.tiempoFinal = false;
        }, 10000);
      }
    }

    return [this.formatNumber(horax), this.formatNumber(minx), this.formatNumber(secx)];
  }

  changeUser() {
    if (!this.animating) {
      this.animating = true;
      if (!this.dragging) {

        if (this.claseT1 == 'mostrar' || this.claseT1 == '') {
          this.claseT1 = 'ocultar';
          this.claseT2 = 'mostrar';
        } else {
          this.claseT1 = 'mostrar';
          this.claseT2 = 'ocultar';
        }
      }

      setTimeout(() => {
        this.animating = false;
      }, 1500);
    }
  }

  drag1() {
    this.dragging = true;
  }

  drag2() {
    setTimeout(() => {
      this.dragging = false;
    }, 100);
  }

}
