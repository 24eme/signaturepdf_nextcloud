<?php

declare(strict_types=1);

namespace OCA\SignaturePDF\AppInfo;

use OCA\SignaturePDF\BackgroundJob\CleanupExpiredTokensJob;
use OCP\AppFramework\App;
use OCA\SignaturePDF\Listener\CSPListener;
use OCP\AppFramework\Bootstrap\IBootContext;
use OCP\AppFramework\Bootstrap\IBootstrap;
use OCP\AppFramework\Bootstrap\IRegistrationContext;
use OCP\Security\CSP\AddContentSecurityPolicyEvent;
use OCP\Util;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\SabrePluginEvent;
use OCA\DAV\Events\SabrePluginAddEvent;
use OCA\SignaturePDF\Connector\Sabre\CorsPlugin;
use OCP\BackgroundJob\IJobList;
use OCP\IConfig;

class Application extends App implements IBootstrap {
	public const APP_ID = 'signaturepdf_nextcloud';
	private const CLEANUP_JOB_INTERVAL_CONFIG_KEY = 'cleanup_job_interval';
	public const TOKEN_LIFETIME = 60;
	public const TOKEN_NAME_PREFIX = 'SignaturePDF: ';

	/** @psalm-suppress PossiblyUnusedMethod */
	public function __construct() {
		parent::__construct(self::APP_ID);
		Util::addScript(self::APP_ID, self::APP_ID.'-fileAction');

		$dispatcher = $this->getContainer()->query(IEventDispatcher::class);
		$dispatcher->addListener(SabrePluginAddEvent::class, function(SabrePluginAddEvent $event) {
		$event->getServer()->addPlugin(new CorsPlugin());
});
	}

	public function register(IRegistrationContext $context): void {
		$context->registerEventListener(
			AddContentSecurityPolicyEvent::class,
			CSPListener::class
		);
	}

	public function boot(IBootContext $context): void {
		$context->injectFn(function (IJobList $jobList, IConfig $config): void {
			$currentInterval = (string)self::TOKEN_LIFETIME;
			$registeredInterval = $config->getAppValue(self::APP_ID, self::CLEANUP_JOB_INTERVAL_CONFIG_KEY, '');
			$hasJob = $jobList->has(CleanupExpiredTokensJob::class, null);

			if (!$hasJob || $registeredInterval !== $currentInterval) {
				if ($hasJob) {
					$jobList->remove(CleanupExpiredTokensJob::class, null);
				}

				$jobList->add(CleanupExpiredTokensJob::class, null);
				$config->setAppValue(self::APP_ID, self::CLEANUP_JOB_INTERVAL_CONFIG_KEY, $currentInterval);
			}
		});
	}
}
