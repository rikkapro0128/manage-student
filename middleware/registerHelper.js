const avatarDefault = {
    male: '/uploads/avatar-default/male.jpg',
    female: '/uploads/avatar-default/female.jpg',
    ungender: '/uploads/avatar-default/ungender.png',
}

module.exports = function(hbs) {
    
    hbs.registerHelper('gender', function(type, value) {
        if(type === value) { 
            return 'selected';
        }
    });

    hbs.registerHelper('showAvatar', function(avatar, gender) {
        if(avatar) { 
            return avatar;
        }else {
            return gender === 'Nam' ? avatarDefault.male : avatarDefault.female;
        }
    });

    hbs.registerHelper('handleName', function(data) {
        if(data.infoAccount.lastName && data.infoAccount.firstName) {
            return `${data.infoAccount.firstName} ${data.infoAccount.lastName}`;
        }else {
            return data.fullName;
        }
    });

}
