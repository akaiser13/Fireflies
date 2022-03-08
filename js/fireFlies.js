function init() {
    
    // Perform setup tasks
    canvas = document.querySelector('.fireFlies');
    ctx = canvas.getContext('2d');
    
    // Initialize variables
    fireFlies = [];
    numFlies = 250;
    angleX = 0;
    angleY = 0;
    range = 1.2;
    xSpeed = .7;
    ySpeed = .1;
    fps = 15;
    
    // Create a batch of FireFly particles and add each new particle object to the fireFlies array as they are created.
    for (var i = 0; i < numFlies; i++) {
        
        // Set x and y velocity values that are random in a range
        xVelocity = randRange(-4, 2);
        yVelocity = randRange(-4, 2);
        // Dont want velocity values to be near 0
        if (xVelocity < 1 && xVelocity > -1) {
            xVelocity = -1;
        }
        
        if (yVelocity < 1 && yVelocity > -1) {
            yVelocity = -1;
        }
        // Create a new FireFly particle object and add it to the end of the fireFlies array.
        fireFlies.push(new FireFly(10, canvas.height - 10, 10, canvas.width - 10, xVelocity, yVelocity));
        
    }
    
    // Get the firefly animation started using a timer to kick of our animation loop. Have it run repeatedly at our framerate until the user leaves the page
    // Use the browser's feature detection to determine which version of requestAnimationFrame() to use.
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    
    // Run update() to get animation loop started
    requestAnimationFrame(update);
    
} 

// Constructor function for the FireFly "class"
function FireFly(topEdge, bottomEdge, leftEdge, rightEdge, xVel, yVel) {
    
    // Build an instance (object) of type FireFly
    // Set up properties on this class
    // Note: the this keyword now refers to our new FireFly object
    // Save the passed in parameter values in properties of our new FireFly object for later use
    this.top = topEdge;
    this.bottom = bottomEdge;
    this.left = leftEdge;
    this.right = rightEdge;
    this.xVelocity = xVel;
    this.yVelocity = yVel;
    
    // Set up the rest of our object's properties
    
    // Initial position of the firefly
    this.x = Math.random() * canvas.width / 2;
    this.y = Math.random() * canvas.width;
    
    this.alpha = randRange(.2, .9);
    this.color = 'rgba(153, 255, 51, ' + this.alpha + ')';
    this.radius = randRange(.5, 1.5);
    
    this.blink = false;
    this.maxBlinkRate = 15;
    this.blinkRate = Math.floor(randRange(0, this.maxBlinkRate));
    
}

// Animation loop
// Will draw and animate the FireFly particle objects framerate times per seconds
function update() {
    
    // use a hack using setTimeout() to set the framerate
    setTimeout(function() {
        
        // Clear the canvas so it can be redrawn
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw the FireFly particle objects that are in our fireFlies array
        fireFlies.forEach(function (fly, index) {
            
            ctx.beginPath();
            
            ctx.fillStyle = fly.color;
            
            // Based on the blink rate, reset the blink property
            if (fly.blinkRate >= fly.maxBlinkRate) {
                
                fly.blinkRate = 0;
                fly.blink = false;
                
            } else {
                
                fly.blinkRate++;
                
                if (fly.blinkRate >= 7) {
                    
                    fly.blink = true;
                    
                }
                
            }
            
            // If the fly is visible, draw it.
            if (fly.blink) {
                
                ctx.arc(fly.x, fly.y, fly.radius, 0, Math.PI * 2, false);
                ctx.fill();
                
            }
            
            ctx.closePath();
            
            // Animate each FireFly particle object
            // Apply a velocity to change the object's x and y properties
            fly.x += fly.xVelocity + Math.cos(angleX) * range;
            fly.y += fly.yVelocity + Math.sin(angleY) * range;
            
            // Alter the angle
            angleX += xSpeed;
            angleY += ySpeed;
            
            // Collision detection between our FireFly objects and our canvas boundaries
            
            // Check the bottom edge
            if (fly.y >= fly.bottom + 25 && fly.yVelocity > 0) {
                
                fly.y = fly.bottom + 5;
                fly.yVelocity *= -1;
                
            } else if (fly.y <= fly.top - 25 && fly.yVelocity < 0) {
                
                fly.y = 5;
                fly.yVelocity *= -1;
                
            }
            if (fly.x >= fly.right + 25 && fly.xVelocity > 0) {
                
                fly.x = fly.right + 5;
                fly.xVelocity *= -1;
                
            } else if (fly.x <= fly.left - 25 && fly.xVelocity < 0) {
                
                fly.x = 5;
                fly.xVelocity *= -1;
                
            }
            
        });
        
        requestAnimationFrame(update);
        
    }, 1000 / fps);
    
}

// Generate a random number between the passed in min and max values
function randRange(min, max) {
    
    return Math.random() * (max-min) + min;
    
}