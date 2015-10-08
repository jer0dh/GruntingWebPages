# Grunting Web Pages #

This contains some basic grunt tasks to help with the development of a web page like a landing page.

There are some grunt tasks that can be used to merge a json file containing your data and creating
multiple source.html files with that data.  You can see my github Grunting Email Campaign for more details

Look at the article in the Thanks section on getting Windows and Vagrant working together.

Vagrant file provisions the new box with the updated versions of ruby and nodejs, but look at the `Vagrantfile` file for commands that are needed to
be run after provisioned...just couldn't get it to work in this script but worked by ssh shell later

Not sure if it is an issue with Virtualbox, Vagrant, or PHPStorm on Windows, but the synchronization of files on the share is
not great.  So I setup a macro and keyboard shortcut in PHPStorm that Saves All and runs a Synchronization.  Sometimes you have to
run the shortcut twice as any watch tasks may not complete before the synchronization runs.

An initial run of `vagrant up` may need to be run using a command terminal Run as Administrator to create the symlinked node_modules folder.
If not, one can run the `ln` command in the vagrantfile to create the symlink in an Administrator command terminal.  See the article mentioned
in the Thanks section for more details.

Added picturefill.js and grunt-responsive-images to help in the creation of different image sizes.  Right now, put images in `working/images` that
you want to resize and then run `grunt responsive`  This will create the different sized images under `working/r-images`  Move
the images you want on your webpage into the `images` folder.  Add your `<picture>` elements to your source.html.


* source.html - Here is where you type in the HTML
* css\my_styles.scss - Contains your customized css styles.  Not SASS but using Postcss-simple-variables
* \images - put all your images here
* \working - a directory for files that are created and destroyed during the grunt process..always safe to delete contents
* css\bootstrap.css - Boostrap css.  Replace this file with the latest version


 ## Notes ##

 Make sure your full file paths do not contain spaces otherwise uncss may fail.


## Thanks ##

This article is a great help getting Vagrant, NodeJS, and Windows to work [Getting Vagrant, Nodejs, and Windows to Play Well Together](http://blog.prolificinteractive.com/2015/01/21/getting-vagrant-nodejs-windows-play-well-together/)

Special Thanks to Victor Garcia's article [A workflow for responsive emails using Ink and Grunt](https://medium.com/@victorgarcia/a-workflow-for-responsive-emails-using-ink-and-grunt-32d607879082)

Check out the awesome Zurb's Ink: [A framework for Responsive HTML email](http://zurb.com/ink/)

Check out CodeSchool's [Unmasking HTML Emails course](http://campus.codeschool.com/courses/unmasking-html-emails) (Does not' use Ink but very helpful!)

## Change Log ##

20151006 Initial creation