import { Component,OnDestroy,Input,SimpleChanges} from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnDestroy {
  name = 'Its Activity Tracker';
   btnDisabled = true;
   btnEnd = true;
    clock: any;
  minutes: any = '00';
  seconds: any = '00';
  milliseconds: any = '00';
 history:any = [];
  @Input() start: boolean;

   
  
  constructor(){}
 
  activity:any =[];
  laps: any = [];
  counter: number;
  timerRef;
  running: boolean = false;
  startText = 'Start';
   send(event: any) {
        const value = event.target.value;
        this.activity=[];
        this.activity.push(value)
       this.btnDisabled = false;
        console.log(value);
   }
    ngOnDestroy() {
    clearInterval(this.timerRef);
  }
  dostart()
  {
     this.running = !this.running;
     
    if (this.running) {
    
      const startTime = Date.now() - (this.counter || 0);
      this.timerRef = setInterval(() => {
        this.counter = Date.now() - startTime;
       this.btnEnd=false;
        this.milliseconds = Math.floor(Math.floor(this.counter % 1000) / 10).toFixed(0);
        this.minutes = Math.floor(this.counter / 60000);
        this.seconds = Math.floor(Math.floor(this.counter % 60000) / 1000).toFixed(0);
        if (Number(this.minutes) < 10) {
          this.minutes = '0' + this.minutes;
        } else {
          this.minutes = '' + this.minutes;
        }
        if (Number(this.milliseconds) < 10) {
          this.milliseconds = '0' + this.milliseconds;
        } else {
          this.milliseconds = '' + this.milliseconds;
        }
        if (Number(this.seconds) < 10) {
          this.seconds = '0' + this.seconds;
        } else {
          this.seconds = '' + this.seconds;
        }
      });
    }
  }
 reset() {
    this.running = false;
    this.startText = 'Start';
    this.counter = undefined;
    this.milliseconds = '00',
      this.seconds = '00',
      this.minutes = '00';
    this.laps = [];
    this.activity=[];
    this.btnEnd=true;
    this.btnDisabled=true;
 
    
    clearInterval(this.timerRef);
  }
 stop() {
  
    let lapTime = this.minutes + ':' + this.seconds + ':' + this.milliseconds;
     this.laps = [];
    clearInterval(this.timerRef);
    this.laps.push(lapTime);
    console.log(this.laps)

   this.history.push({'Activity':this.activity,'Time':this.laps});
   console.log(this.history);
    console.log("The activity you choose is "+this.activity +" the duration of the time is"+this.laps)
  }
last()
{
  this.history.splice(-1,1);
  console.log(this.history);
}
allreset()
{
   this.running = false;
    this.startText = 'Start';
    this.counter = undefined;
    this.milliseconds = '00',
      this.seconds = '00',
      this.minutes = '00';
    this.laps = [];
    this.activity=[];
    this.btnEnd=true;
    this.btnDisabled=true;
 
  this.history =[];
  console.log(this.history);
}
}
