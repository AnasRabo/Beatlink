<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DescriptionContoller extends AbstractController
{
    #[Route('/description', name: 'description', methods: ['GET'])]
    public function displayHome(): Response
    {
        return $this->render('guest/user-description.html.twig');
    }
}