 module.exports.createNotification = async (project, User, Notification, message, type) => {
     // Create a single notification for all team members
     const notification = await Notification.create({
         recipients: project.team,
         message: message,
         type: type,
     });

     // Update the notifications field of team members
     const userPromises = project.team.map(async (teamMember) => {
         const user = await User.findById(teamMember);
         user.notifications.push(notification);
         await user.save();
     });
     await Promise.all(userPromises);
 }
