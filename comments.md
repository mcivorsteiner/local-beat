I'm very pleased with this.  You've made a very good effort at designing a
robust OO JS MVC framework.  You should be proud.  You've really spent time
coming up with a nice, neat, clean API.  I really respect and appreciate that.

Your JS code is really readable because of these decisions.  While I may
differ in my opinion as to where something belongs, we're discussing
implementation details, not design directions.

I love you all but your DB migrations suck.  You need to guard your data tables
from being corrupted / getting filled with junk.  You might be guarding with
AR, but you need the DB to help.

Are you keeping ArtistsController around for any reason?  You're not routing to
it.

Keep filling out your test suite, you're in a good spot, but keep going. esp.
your javascript section

I'd expect unit tests for location and artist too.

Nice use of DB Cleaner.

You're looking like you're in great shape and have really interenalized a lot
of our discussions.  Keep pushing the testing and neaten up the JS app's
construction and you're going to have a legendary app.  Keep focusing on
guarding against accidental blow-ups too.  Try to be unbrittle.

Also, remove crufy hack-ass code.  Looking at you `rescue nil`.
