<?php

declare(strict_types=1);

namespace OCA\SignaturePDF\Controller;

use OCA\SignaturePDF\AppInfo\Application;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\Attribute\FrontpageRoute;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\Attribute\OpenAPI;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Http\DataResponse;
use OC\Authentication\Token\IProvider;
use OC\Authentication\Token\IToken;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\IRequest;
use OCP\IUserSession;
use OCP\Security\ISecureRandom;
use OCP\ISession;

/**
 * @psalm-suppress UnusedClass
 */
class PageController extends Controller {

	/** @var IProvider */
	protected $tokenProvider;

	/** @var IUserSession */
	protected $userSession;

	/** @var ISession */
	protected $session;

	/** @var ISecureRandom */
	protected $random;

	/** @var ITimeFactory */
	private $timeFactory;

	public function __construct($appName,
			IRequest $request,
			IProvider $tokenProvider,
			ITimeFactory $timeFactory,
			IUserSession $userSession,
			ISession $session,
			ISecureRandom $random) {
			parent::__construct($appName, $request);

			$this->tokenProvider = $tokenProvider;
			$this->timeFactory = $timeFactory;
			$this->userSession = $userSession;
			$this->session = $session;
			$this->random = $random;
}

	#[NoCSRFRequired]
	#[NoAdminRequired]
	#[OpenAPI(OpenAPI::SCOPE_IGNORE)]
	#[FrontpageRoute(verb: 'GET', url: '/')]
	public function index(): TemplateResponse {

		return new TemplateResponse(
			Application::APP_ID,
			'index',
			['pdf' => $this->request->getParam('source')]
		);
	}


	#[NoCSRFRequired]
	#[NoAdminRequired]
	#[OpenAPI(OpenAPI::SCOPE_IGNORE)]
	#[FrontpageRoute(verb: 'GET', url: '/onetime_webauth_token')]
	public function generateOneTimeWebAuthToken(): DataResponse {		$sessionId = $this->session->getId();
		try {
			$sessionToken = $this->tokenProvider->getToken($sessionId);
			$loginName = $sessionToken->getLoginName();
			try {
				$password = $this->tokenProvider->getPassword($sessionToken, $sessionId);
			} catch (PasswordlessTokenException) {
				$password = null;
			}
			} catch (InvalidTokenException) {
				return $this->getServiceNotAvailableResponse();
			}
			// $groups = [];
			// for ($i = 0; $i < 5; $i++) {
			// 	$groups[] = $this->random->generate(5, ISecureRandom::CHAR_HUMAN_READABLE);
			// }
			// $token = implode('-', $groups);
			$targetOrigin = $this->request->getHeader('target-origin');
			$name = Application::TOKEN_NAME_PREFIX . $targetOrigin . ' ' . $this->request->getHeader('USER_AGENT');
			$token = $this->random->generate(
				72,
				ISecureRandom::CHAR_UPPER . ISecureRandom::CHAR_LOWER . ISecureRandom::CHAR_DIGITS
			);
			$loginName = $sessionToken->getLoginName();
			$deviceToken = $this->tokenProvider->generateToken(
				$token,
				$this->userSession->getUser()->getUID(),
				$loginName,
				$password,
				$name,
				IToken::PERMANENT_TOKEN,
				IToken::DO_NOT_REMEMBER
			);

		$deviceToken->setExpires($this->timeFactory->getTime() + Application::TOKEN_LIFETIME);
		$this->tokenProvider->updateToken($deviceToken);

		return new DataResponse(
			[
				'token' => $deviceToken->getLoginName().":".$token,
			]
		);
	}
}
