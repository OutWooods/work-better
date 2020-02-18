### [2019-02-18]

#### Added

- Show date on task if it's not today.

### [2019-02-17]

#### Added

- Have a log for the day of completed cycles (Task, Time, start and end).

- Track every time during the timer you come and check the page.

- Can pause time.

- Stop logs incomplete activities.

- Make focus optional.

- Can toggle the help sections on the site.

- Can see tasks and completed tasks from localStorage.

- Clear local storage - completed tasks.

- Clear local storage - areas of Focus (and completed tasks).

- Show total time worked today.

#### Changed

- The completed tasks section always visible.

#### Fixed

- show current focus

- if time runs out, pause button should disappear

#### Technical

- Store helper methods in utlities (now must run with `http-server` locally)

- DEPEDENCY: Add `date-fns`

### [2019-02-14]

#### Added

- Can time for 30 minutes

- Can stop timer

- Add links to three good work sounds

- Sound goes off when the 30 minutes is done

- Page title changes when time is running or complete

- Can log different 'focus areas' <- want a better name. With increase/decrease counts

- Have a 'current focus'. Which auto increments if you finish the timer

