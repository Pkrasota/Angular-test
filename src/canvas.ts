import {fromEvent, map, pairwise, switchMap, takeUntil} from "rxjs";

const canvas = document.getElementById('canvas') as HTMLCanvasElement;

const context = canvas.getContext('2d')!;

context.lineWidth = 5;

interface Position {
  x: number;
  y: number;
}
function drawLine([prev, next]: Position[]) {
  context.beginPath();
  context.moveTo(prev.x, prev.y);
  context.lineTo(next.x, next.y);
  context.stroke();
}

 const mousemove$ = fromEvent<MouseEvent>(canvas, 'mousemove');
 const mousedown$ = fromEvent<MouseEvent>(canvas, 'mousedown');
 const mouseup$ = fromEvent<MouseEvent>(canvas, 'mouseup');
 const mouseout$ = fromEvent<MouseEvent>(canvas, 'mouseout');

 const points$ = mousemove$.pipe(
   map<MouseEvent, Position>(({
                                clientX,
                                clientY
   }) => {
     const {top, left} = canvas.getBoundingClientRect();
     return {
       x: clientX - left,
       y: clientY - top
     }
   }),
   pairwise<Position>()
 );
 mousedown$.pipe(
   switchMap(() => points$.pipe(
     takeUntil(mouseout$),
     takeUntil(mouseup$)
   ))
 ).subscribe(drawLine);

