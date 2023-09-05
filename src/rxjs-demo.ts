import {debounce, debounceTime, distinctUntilChanged, map, Observable} from "rxjs";

const search$ = new Observable<Event>(observer => {
  const search = document.getElementById('search');
  if(!search) {
    observer.error('Element does not not exist')
    return;
  }
  search.addEventListener('input', event => {
    observer.next(event)
  });
 });

search$.pipe(
  map(event => {
    return (event.target as HTMLInputElement).value;
  }),
    debounceTime(500),
    map(value => value.length > 3 ? value : ''),
    distinctUntilChanged()
).subscribe(value => {
  console.log(value)
})
