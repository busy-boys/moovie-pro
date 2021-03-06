## Dave's Git Hints:

### Going back to your last commit.

I use this a bit if I get stuck going down the wrong tangent and want to get back to some working code! - it just 'rewinds' all your files so they match your last **LOCAL** commit. This is another advantage to commititng regularly! no more frantic ctrl+z'ing !!! :joycat:

#### Non Destructive

1. `git stash` -- stashes changes (on your local machine. - not sure if they find their way to git!)
2. it will tell you what it did and where it is has thrown you back to.
3. if that was a mistake just bring the latest stash back with `git stash pop`

> Bonus Tip:
> You may notice that you now have a `*1` next to your branch in the terminal - this just means that you have a stash sitting around.
> If this annoys you and you dont need it, just clear the stash out with `git stash clear`

#### Destructive -- prob only if you are comfortable and know you really dont want the changes!

1. `git reset --hard HEAD`
2. it should tell how which commit you are back to + comment and your files are all rolled bcak to that commit!

### Creating a feature branch

1. **DON’T BE A NOOB LIKE ME 😂**
2. Make sure you are on the main branch!!! (and it is up to date `git pull`) As these are the files you want to be working from! `git checkout main`
3. Create feature branch `git checkout -b <branch name>`

example name. `m10-search-by-title`

### Somebody changed something on the main branch and you want it in your feature branch?

Probably not a great idea if you are working on the feature with somebody else. If so, **communicate**

1. **In your feature branch (checked-out)** Stash whatever you are working on (these will be changes since your last commit) These just go to a holding area. `git stash`
2. Jump onto main branch `git checkout main`
3. Pull down latest changes `git pull`
4. Jump back onto feat branch `get checkout <feaure-branch-name>`
5. Pull(you are actually just doing a merge) main into your feature `git pull origin main`
6. Prob going to get a text editor pop up (mine is nano) for a commit message just save this and exit (nano - `ctrl + o`(output/save) `enter`then `ctrl + x` to exit) if vi/m. Write and quite (enter cmd mode (`esc key` then `:wq`) This is just to change the message on the merge (will show up in github, default generated is fine)
7. Bring your stashed changes back `git stash pop` (removes saved stash, can use `get stash apply` to keep)
