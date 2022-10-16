import { Component, OnInit } from '@angular/core';
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-indexhome',
  templateUrl: './indexhome.component.html',
  styleUrls: ['./indexhome.component.scss']
})
export class IndexhomeComponent implements OnInit {
  aux = '';
  interval: any;
  hora1!: string[];
  hora2!: string[];
  currentHora: string[] = ['15', '00', '00'];
  currentAux: string[] = ['18', '30', '00'];
  user = "user1";
  horas: string[] = [];
  minSec: string[] = [];
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
    // this.mail.setData('melmartincasas@gmail.com').subscribe({
    //   next: (data) => {
    //     console.log(data);
    //   }
    // });
    this.setDate();
  }

  setDate() {
    clearInterval(this.interval);
    this.hora1 = this.getCurrentDate(this.currentHora[0], this.currentHora[1], this.currentHora[2]);
    // this.hora2 = this.getCurrentDate(this.currentAux[0], this.currentAux[1], this.currentAux[2]);

    this.interval = setInterval(() => {
      this.aux = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
      this.hora1 = this.substractDate(this.hora1[0], this.hora1[1], this.hora1[2]);
      // this.hora2 = this.substractDate(this.hora2[0], this.hora2[1], this.hora2[2]);
    }, 1000)
  }

  formatNumber(num: number) {
    return num.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    });
  }

  substractDate(horaS: string, minS: string, secS: string) {
    let hora = parseInt(horaS);
    let min = parseInt(minS);
    let sec = parseInt(secS) - 1;

    if (sec < 0) {
      sec = 59;
      min--;
      if (min < 0) {
        min = 59;
        hora--;
        if (hora < 0) {
          hora = 23;
        }
      }
    }

    return [this.formatNumber(hora), this.formatNumber(min), this.formatNumber(sec)];
  }

  getCurrentDate(horaS: string, minS: string, secS: string): string[] {
    const fecha = new Date();

    let hora = parseInt(horaS);
    let min = parseInt(minS);
    let sec = parseInt(secS);

    let horax = hora - fecha.getHours();
    let minx = min - fecha.getMinutes() - 1;
    let secx = sec - fecha.getSeconds();

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

    return [this.formatNumber(horax), this.formatNumber(minx), this.formatNumber(secx)];
  }

  changeUser() {
    if (!this.animating) {
      this.animating = true;
      if (!this.dragging) {
        // 
        var aux = this.currentHora;
        this.currentHora = this.currentAux;
        this.currentAux = aux;

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
