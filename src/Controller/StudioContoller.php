<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class StudioContoller extends AbstractController
{
    #[Route('/studio', name: 'studio', methods: ['GET'])]
    public function displayHome(): Response
    {
        return $this->render('guest/studio.html.twig');
    }
}