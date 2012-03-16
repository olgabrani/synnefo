# Copyright 2011 GRNET S.A. All rights reserved.
# 
# Redistribution and use in source and binary forms, with or
# without modification, are permitted provided that the following
# conditions are met:
# 
#   1. Redistributions of source code must retain the above
#      copyright notice, this list of conditions and the following
#      disclaimer.
# 
#   2. Redistributions in binary form must reproduce the above
#      copyright notice, this list of conditions and the following
#      disclaimer in the documentation and/or other materials
#      provided with the distribution.
# 
# THIS SOFTWARE IS PROVIDED BY GRNET S.A. ``AS IS'' AND ANY EXPRESS
# OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
# WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
# PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL GRNET S.A OR
# CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
# SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
# LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF
# USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
# AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
# LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
# ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
# POSSIBILITY OF SUCH DAMAGE.
# 
# The views and conclusions contained in the software and
# documentation are those of the authors and should not be
# interpreted as representing official policies, either expressed
# or implied, of GRNET S.A.

import logging

from django.utils.translation import ugettext as _
from django.template.loader import render_to_string
from django.core.mail import send_mail
from django.core.urlresolvers import reverse
from urllib import quote
from urlparse import urljoin
from random import randint

from astakos.im.settings import DEFAULT_CONTACT_EMAIL, DEFAULT_FROM_EMAIL, SITENAME, BASEURL, DEFAULT_ADMIN_EMAIL
from astakos.im.models import Invitation, AstakosUser

logger = logging.getLogger(__name__)

def send_verification(user, template_name='im/activation_email.txt'):
    """
    Send email to user to verify his/her email and activate his/her account.
    
    Raises SMTPException, socket.error
    """
    url = '%s?auth=%s&next=%s' % (urljoin(BASEURL, reverse('astakos.im.views.activate')),
                                    quote(user.auth_token),
                                    quote(BASEURL))
    message = render_to_string(template_name, {
            'user': user,
            'url': url,
            'baseurl': BASEURL,
            'site_name': SITENAME,
            'support': DEFAULT_CONTACT_EMAIL})
    sender = DEFAULT_FROM_EMAIL
    send_mail('%s alpha2 testing account activation is needed' % SITENAME, message, sender, [user.email])
    logger.info('Sent activation %s', user)

def send_notification(user, template_name='im/admin_notification.txt'):
    """
    Send email to DEFAULT_ADMIN_EMAIL to notify for a new user registration.
    
    Raises SMTPException, socket.error
    """
    if not DEFAULT_ADMIN_EMAIL:
        return
    message = render_to_string(template_name, {
            'user': user,
            'baseurl': BASEURL,
            'site_name': SITENAME,
            'support': DEFAULT_CONTACT_EMAIL})
    sender = DEFAULT_FROM_EMAIL
    send_mail('%s alpha2 testing account notification' % SITENAME, message, sender, [DEFAULT_ADMIN_EMAIL])
    logger.info('Sent admin notification for user %s', user)

def send_invitation(invitation, template_name='im/invitation.txt'):
    """
    Send invitation email.
    
    Raises SMTPException, socket.error
    """
    subject = _('Invitation to %s alpha2 testing' % SITENAME)
    url = '%s?code=%d' % (urljoin(BASEURL, reverse('astakos.im.views.signup')), invitation.code)
    message = render_to_string('im/invitation.txt', {
                'invitation': invitation,
                'url': url,
                'baseurl': BASEURL,
                'site_name': SITENAME,
                'support': DEFAULT_CONTACT_EMAIL})
    sender = DEFAULT_FROM_EMAIL
    send_mail(subject, message, sender, [invitation.username])
    logger.info('Sent invitation %s', invitation)

def send_greeting(user, email_template_name='im/welcome_email.txt'):
    """
    Send welcome email.
    
    Raises SMTPException, socket.error
    """
    subject = _('Welcome to %s alpha2 testing' % SITENAME)
    message = render_to_string(email_template_name, {
                'user': user,
                'url': urljoin(BASEURL, reverse('astakos.im.views.index')),
                'baseurl': BASEURL,
                'site_name': SITENAME,
                'support': DEFAULT_CONTACT_EMAIL})
    sender = DEFAULT_FROM_EMAIL
    send_mail(subject, message, sender, [user.email])
    logger.info('Sent greeting %s', user)

def activate(user, email_template_name='im/welcome_email.txt'):
    """
    Activates the specific user and sends email.
    
    Raises SMTPException, socket.error
    """
    user.is_active = True
    user.save()
    send_greeting(user, email_template_name)

def _generate_invitation_code():
    while True:
        code = randint(1, 2L**63 - 1)
        try:
            Invitation.objects.get(code=code)
            # An invitation with this code already exists, try again
        except Invitation.DoesNotExist:
            return code

def invite(inviter, username, realname, email_template_name='im/welcome_email.txt'):
    """
    Send an invitation email and upon success reduces inviter's invitation by one.
    
    Raises SMTPException, socket.error
    """
    code = _generate_invitation_code()
    invitation = Invitation(inviter=inviter,
                            username=username,
                            code=code,
                            realname=realname)
    invitation.save()
    send_invitation(invitation, email_template_name)
    inviter.invitations = max(0, inviter.invitations - 1)
    inviter.save()

def set_user_credibility(email, has_credits):
    try:
        user = AstakosUser.objects.get(email=email)
        user.has_credits = has_credits
        user.save()
    except AstakosUser.DoesNotExist, e:
        logger.exception(e)
