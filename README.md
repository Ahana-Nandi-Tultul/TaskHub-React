### TaskHub 

This is a web based application. Here user can manage their work in a team environment. This application
use localStorage of browser for storing all of its data.

## Live Site: https://taskhub-3b476.web.app/

## How to use:
* First user need to sign and login for using this application.
* Then user need to create a team.
* The team owner (who creates the team or who have the team-owner) can update and delete the team.
Note: Other than the team owner, no ne can update and delete a specific team.
* When createing or updating team, team-owner have to select the team members. This way the 'joining invitation'
will go to the team-members.
* Team members need to accept the team invitation.
* Team member and team owner can set task and assign task to themselves and other team-members.
* The member who created the task can update or delete the task.
* Team member can filter and sort task which are assigned to them beased on 'status', 'due date' as ascending or descending order.

# Note: You can not create task without being a team Member or create a team by own. If team info is updated then again all the members will get the 'Team Invitation' and have to accept that invitation. If one team member doesnot accept the team invitation, others cannot assign task to him / her. One can only assign task to the members of that team, where he / she is a member also or he or she created that team. By default, team owner is a 

# Features
1. User can login, signup and logout.
2. User can created team, update team and delete team.
3. User can created task and asign task to others team members.
4. In creating task, when user select the team accoriding to that team, the members are fetched.
5. User can update and delete task.
6. User can filter and sort task by 'status' and 'due date'
7. User can mark task as 'pending', 'in-progress' and 'completed'


# Packages, I have used:
1. Firebase - for authentication
2. react-router-dom
3. aos - for animation
4. moment - for date
5. react-hemet - for dynamic title
6. react-form-hooks - for sign up validation
7. react-hot-toast & sweetalert2 for notifications
8. react tooltip and react icons

