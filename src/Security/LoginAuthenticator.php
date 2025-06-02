<?php

namespace App\Security;

// Import des classes nécessaires Symfony pour l'authentification
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

// Classe de base pour un authenticator de formulaire de login
use Symfony\Component\Security\Http\Authenticator\AbstractLoginFormAuthenticator;

// Pour créer un "Passport" qui contient les infos utilisateur et credentials (mot de passe)
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Credentials\PasswordCredentials;

class LoginAuthenticator extends AbstractLoginFormAuthenticator
{
    // Injection du service UrlGeneratorInterface pour générer les URLs de redirection
    public function __construct(private UrlGeneratorInterface $urlGenerator)
    {
    }

    /**
     * Cette méthode est appelée pour authentifier un utilisateur.
     * Elle crée un Passport avec les infos reçues depuis le formulaire.
     */
    public function authenticate(Request $request): Passport
    {
        // On récupère l'email envoyé en POST par le formulaire de connexion
        $email = $request->request->get('email', '');

        // On retourne un Passport avec :
        // - UserBadge : pour charger l'utilisateur par email
        // - PasswordCredentials : pour vérifier le mot de passe
        return new Passport(
            new UserBadge($email),
            new PasswordCredentials($request->request->get('password', ''))
        );
    }

    /**
     * Cette méthode est appelée **après une connexion réussie**.
     * Elle ajoute un message flash et redirige vers la page d'accueil.
     */
    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        // Ajoute un message flash de type 'success' dans la session
        $request->getSession()->getFlashBag()->add('success', 'Connexion réussie !');

        // Redirige vers la route nommée 'home' (page d'accueil)
        return new RedirectResponse($this->urlGenerator->generate('home'));
    }

    /**
     * Retourne l'URL de la page de login, utilisée pour rediriger en cas d'échec de connexion.
     */
    protected function getLoginUrl(Request $request): string
    {
        // Génère l'URL pour la route 'connexion'
        return $this->urlGenerator->generate('connexion');
    }
}
