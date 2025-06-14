<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    #[Route('/home', name: 'home', methods: ['GET'])]
    public function displayHome(): Response
    {
        $user = $this->getUser();

        return $this->render('guest/home.html.twig', [
        ]);
    }
}
