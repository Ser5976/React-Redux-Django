from smtplib import SMTPAuthenticationError, SMTPConnectError

from allauth.account.adapter import DefaultAccountAdapter
from allauth.account.utils import user_username, user_email


class AccountAdapter(DefaultAccountAdapter):
    def send_mail(self, template_prefix, email, context):
        msg = self.render_mail(template_prefix, email, context)
        try:
            msg.send()
        except (SMTPAuthenticationError, SMTPConnectError) as e:
            print(e)
            pass

    def save_user(self, request, user, form, commit=True):
        """
        Saves a new `User` instance using information provided in the
        signup form.
        """

        data = form.cleaned_data
        role = data.get('role')
        email = data.get('email')
        username = data.get('username')
        user.role = role
        user_email(user, email)
        user_username(user, username)
        if 'password1' in data:
            user.set_password(data["password1"])
        else:
            user.set_unusable_password()
        self.populate_username(request, user)
        if commit:
            # Ability not to commit makes it easier to derive from
            # this adapter by adding
            user.save()
        return user
