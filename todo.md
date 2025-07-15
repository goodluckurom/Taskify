- Add url emcoded to the auth pages to push the emails to the params then fetch it in the page that it is being needed: push email to params on redirect to the verify email page then fetch the email from the params and place in the input for verification
-
- **404 Page Auth State**: Replace mock `isAuthenticated = false` in `src/app/not-found.tsx` with real auth state when implementing authentication. The page currently shows different buttons/links based on auth state:

  - When logged in: "Go to Dashboard", "My Projects", "Recent Tasks", "Team Members"
  - When not logged in: "Go to Homepage", "Sign In", "Sign Up", "About"

- for user invitation, make sure that the invitation would not work, if the email to invite is the logged in user email, or if the email is the project owner email....form should error out there

- [ ] from the tasks page, when you click on the task pool in the page , update the local storage so it works ell for mobile
- [ ] hide the kanban view for mobile in the tasks page
- [ ] In the background overlay of alert and dialoag, use the loago to do a nice overlay instead of the default overlay from shadc n

{

first_name:string,

last_name:string,

avartar_url:string

is_onboarded:boolean

}
