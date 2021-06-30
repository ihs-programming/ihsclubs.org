---
title: Physics
---

# Physics

Let's learn about physics (or more accurately, how to model basic physics in Java). 

## Pulling

You should pull the [code examples Github repository](https://github.com/ihs-programming/code-examples) to make sure you have the latest changes. 

To do this, right click the code-examples project. On the dropdown, hover over `Team` and click `Pull` (without the three dots after it). After a few seconds, you should see a popup with the latest changes. 

**Today we will be working out of the `physics` package**

## Coordinate System

Java's coordinate system is a bit interesting. The origin (0, 0) is in the top left corner. Positive y points downwards and positive x points to the right. In other words, it's a normal coordinate system except the y axis is switched. 

![](https://www.researchgate.net/profile/Kim_Bruce/publication/221536685/figure/fig5/AS:654739125587975@1533113380481/4-The-Java-coordinate-system.png)

## Images

Images are represented by the corresponding Java `Image` object. 

We can read an image from a file through `ImageIO.read`. Note that the file path is relative to the project root. 
```
Image img = ImageIO.read(new File("./jumpscare.png"));
```

As in the above example, `jumpscare.png` should be put in the `code-examples` project. 

We can draw images with the `g.drawImage` method. 

```
g.drawImage(img, 0, 0, 50, 50, null);
```

> The null represents an ImageObserver, which we don't need

However, reading the image might throw an [IOException](https://docs.oracle.com/javase/7/docs/api/java/io/IOException.html). To handle this, we can simply add a try catch around the code. 

```
try {
  Image img = ImageIO.read(new File("./jumpscare.png"));
  g.drawImage(img, 0, 0, 50, 50, null); 
} catch (IOException e) {
 e.printStackTrace();
}
```

This will draw the image in `jumpscare.png` with a top-left corner at (0, 0), with a width ane height of 50. 

See the [documentation on Graphics](https://docs.oracle.com/javase/7/docs/api/java/awt/Graphics.html) for more information. 

## Homework
- Add velocity for the player (2 points)
- Add other objects which are also affected by physics (4 points)
- Make a model of the solar system (with gravity) (5 points)
- Make a platformer with multiple platforms (8 points)
