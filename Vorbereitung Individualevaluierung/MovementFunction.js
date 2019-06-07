function MovementControls(ig,game,speed)
{

  if(ig.input.state('up'))
  {
    if(ig.input.state('up')&&ig.input.state('left'))
    {
      game.vel.y = -speed;
      game.vel.x = -speed;
    }
    else if(ig.input.state('up')&&ig.input.state('right'))
    {
      game.vel.y = -speed;
      game.vel.x = speed;

    }
    else if(ig.input.state('up'))
    {
      game.vel.y = -speed;
      game.vel.x = 0;

    }
  }

  else if(ig.input.state('down'))
  {
    if(ig.input.state('down')&&ig.input.state('left'))
    {
      game.vel.y = speed;
      game.vel.x = -speed;

    }
    else if(ig.input.state('down')&&ig.input.state('right'))
    {
      game.vel.y = speed;
      game.vel.x = speed;

    }
    else if(ig.input.state('down'))
    {
      game.vel.y = speed;
      game.vel.x = 0;

    }
  }
  else if(ig.input.state('left'))
  {
    if(ig.input.state('left')&&ig.input.state('up'))
    {
      game.vel.y = -speed;
      game.vel.x = -speed;

    }
    else if(ig.input.state('left')&&ig.input.state('down'))
    {
      game.vel.y = speed;
      game.vel.x = -speed;

    }
    else if(ig.input.state('left'))
    {
      game.vel.x = -speed;
      game.vel.y = 0;

    }
  }

  else if(ig.input.state('right'))
  {
    if(ig.input.state('right')&&ig.input.state('up'))
    {
      game.vel.y = -speed;
      game.vel.x = speed;

    }
    else if(ig.input.state('right')&&ig.input.state('down'))
    {
      game.vel.y = speed;
      game.vel.x = speed;

    }
    else if(ig.input.state('right'))
    {
      game.vel.x = speed;
      game.vel.y = 0;

    }
  }
  else
  {
    game.vel.x = 0;
    game.vel.y = 0;
  }
}
